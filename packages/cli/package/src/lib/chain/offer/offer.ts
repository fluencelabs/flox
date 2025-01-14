/**
 * Fluence CLI
 * Copyright (C) 2024 Fluence DAO
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import assert from "node:assert";

import { color } from "@oclif/color";
import times from "lodash-es/times.js";
import { yamlDiffPatch } from "yaml-diff-patch";

import { commandObj } from "../../commandObj.js";
import {
  ensureComputerPeerConfigs,
  ensureReadonlyProviderConfig,
} from "../../configs/project/provider/provider.js";
import {
  ipSupplyToIndividualIPs,
  type ResourceType,
  type ResourcePrices,
  resourceTypeToOnChainResourceType,
  OnChainResourceType,
  isOnChainResourceType,
  onChainResourceTypeToResourceType,
  getDataCentersFromChain,
  resourcePriceToBigInt,
  getResourcesFromChain,
} from "../../configs/project/provider/provider4.js";
import {
  initNewProviderArtifactsConfig,
  initProviderArtifactsConfig,
} from "../../configs/project/providerArtifacts/providerArtifacts.js";
import {
  ALL_FLAG_VALUE,
  CLI_NAME,
  OFFER_FLAG_NAME,
  OFFER_IDS_FLAG_NAME,
  PROVIDER_ARTIFACTS_CONFIG_FULL_FILE_NAME,
  PROVIDER_CONFIG_FULL_FILE_NAME,
  VCPU_PER_CU,
} from "../../const.js";
import {
  getContracts,
  getSignerAddress,
  guessTxSizeAndSign,
  getEventValue,
} from "../../dealClient.js";
import { getOffers } from "../../gql/gql.js";
import { setTryTimeout } from "../../helpers/setTryTimeout.js";
import { stringifyUnknown } from "../../helpers/stringifyUnknown.js";
import { bigintToStr, numToStr } from "../../helpers/typesafeStringify.js";
import {
  commaSepStrToArr,
  splitErrorsAndResults,
} from "../../helpers/utils.js";
import { assertIsHex } from "../../helpers/validations.js";
import { checkboxes, confirm } from "../../prompt.js";
import { ensureFluenceEnv } from "../../resolveFluenceEnv.js";
import { getProtocolVersions } from "../chainValidators.js";
import {
  peerIdBase58ToUint8Array,
  peerIdHexStringToBase58String,
  resourceSupplyFromChainToConfig,
  resourceSupplyFromConfigToChain,
} from "../conversions.js";
import { ptFormatWithSymbol } from "../currencies.js";
import { assertProviderIsRegistered } from "../providerInfo.js";

const MARKET_OFFER_REGISTERED_EVENT_NAME = "MarketOfferRegistered";
const OFFER_ID_PROPERTY = "offerId";

export type OffersArgs = {
  [OFFER_FLAG_NAME]?: string | undefined;
  [OFFER_IDS_FLAG_NAME]?: string | undefined;
  force?: boolean | undefined;
};

export async function createOffers(flags: OffersArgs) {
  const allOffers = await resolveOffersFromProviderConfig(flags);
  const providerConfig = await ensureReadonlyProviderConfig();
  const providerConfigPath = providerConfig.$getPath();
  const { contracts } = await getContracts();
  const providerArtifactsConfig = await initNewProviderArtifactsConfig();
  const fluenceEnv = await ensureFluenceEnv();

  const [alreadyCreatedOffers, offers] = splitErrorsAndResults(
    allOffers,
    (offer) => {
      const { id } =
        providerArtifactsConfig.offers[fluenceEnv]?.[offer.offerName] ?? {};

      return id === undefined ? { result: offer } : { error: offer };
    },
  );

  if (alreadyCreatedOffers.length > 0 && flags.force !== true) {
    commandObj.warn(
      `You already created the following offers: ${alreadyCreatedOffers
        .map(({ offerName }) => {
          return offerName;
        })
        .join(
          ", ",
        )}. You can update them if you want using '${CLI_NAME} provider offer-update' command`,
    );
  }

  const offerRegisterResults: (
    | { result: { offerId: string; offerName: string } }
    | { error: string }
  )[] = [];

  function pushOfferRegisterResult(
    result: (typeof offerRegisterResults)[number],
  ) {
    if ("error" in result) {
      commandObj.warn(result.error);
    }

    offerRegisterResults.push(result);
  }

  for (const offer of offers) {
    if (!(await confirmOffer(offer))) {
      continue;
    }

    const {
      computePeersFromProviderConfig: allCPs,
      offerName,
      resourcePricesWithIds,
      dataCenter,
    } = offer;

    const resourcePricesArray = Object.values({
      ...resourcePricesWithIds,
      cpu: resourcePricesWithIds.cpu.map((cpu) => {
        return { ...cpu, price: cpu.price / BigInt(VCPU_PER_CU) };
      }),
    }).flat();

    const allCUs = allCPs.flatMap(({ unitIds }) => {
      return unitIds;
    });

    let registeredCUsCount;
    let addedCPs;
    let offerRegisterTxReceipt;

    try {
      ({
        sliceIndex: registeredCUsCount,
        registeredValues: addedCPs,
        txReceipt: offerRegisterTxReceipt,
      } = await guessTxSizeAndSign({
        sliceValuesToRegister: sliceCPsByNumberOfCUs(allCPs),
        sliceIndex: allCUs.length,
        getArgs(computePeersToRegister) {
          return [
            contracts.deployment.usdc,
            resourcePricesArray,
            setCPUSupplyForCP(computePeersToRegister),
            dataCenter.id,
          ];
        },
        getTitle() {
          return `Register offer: ${offerName}`;
        },
        method: contracts.diamond.registerMarketOfferV2,
        validateAddress: assertProviderIsRegistered,
      }));
    } catch (e) {
      pushOfferRegisterResult({
        error: `Error when registering offer ${offerName}: ${stringifyUnknown(e)}`,
      });

      continue;
    }

    let offerId;

    try {
      offerId = getEventValue({
        contract: contracts.diamond,
        eventName: MARKET_OFFER_REGISTERED_EVENT_NAME,
        txReceipt: offerRegisterTxReceipt,
        value: OFFER_ID_PROPERTY,
      });

      if (typeof offerId !== "string") {
        pushOfferRegisterResult({
          error: `Got: ${stringifyUnknown(offerId)}, instead of offer id string from ${MARKET_OFFER_REGISTERED_EVENT_NAME} event for offer ${color.yellow(
            offerName,
          )}`,
        });

        continue;
      }
    } catch (e) {
      pushOfferRegisterResult({
        error: `Error when getting ${OFFER_ID_PROPERTY} property from event ${MARKET_OFFER_REGISTERED_EVENT_NAME} for offer ${offerName}: ${stringifyUnknown(e)}`,
      });

      continue;
    }

    const providerAddress = await getSignerAddress();
    const offerPerEnv = providerArtifactsConfig.offers[fluenceEnv] ?? {};
    offerPerEnv[offerName] = { id: offerId, providerAddress };
    providerArtifactsConfig.offers[fluenceEnv] = offerPerEnv;
    await providerArtifactsConfig.$commit();

    if (registeredCUsCount === allCUs.length) {
      pushOfferRegisterResult({ result: { offerId, offerName } });
      continue;
    }

    try {
      await addRemainingCUs({
        allCPs,
        addedCPs,
        offerId,
        offerName,
      });

      await addRemainingCPs({
        allCPs,
        addedCPs,
        offerId,
        offerName,
      });
    } catch (e) {
      pushOfferRegisterResult({
        error: `Error when adding remaining CUs or CPs to the created offer ${color.yellow(offerName)} (${offerId}). You can try using ${color.yellow(`${CLI_NAME} provider offer-update --${OFFER_FLAG_NAME} ${offerName}`)} command to update on-chain offer to match your offer definition in ${providerConfigPath}. Error: ${stringifyUnknown(e)}`,
      });

      continue;
    }

    pushOfferRegisterResult({ result: { offerId, offerName } });
  }

  const [offerCreateErrors, createdOffers] = splitErrorsAndResults(
    offerRegisterResults,
    (res) => {
      return res;
    },
  );

  if (offerCreateErrors.length > 0) {
    commandObj.warn(
      `Got the following errors when creating offers:\n\n${offerCreateErrors.join(
        "\n\n",
      )}`,
    );
  }

  if (createdOffers.length === 0) {
    return commandObj.error("No offers created");
  }

  type GetOffersInfoReturnType = Awaited<
    ReturnType<typeof getOffersInfo<(typeof createdOffers)[number]>>
  >;

  let offerInfoErrors: GetOffersInfoReturnType[0] = [];
  let offersInfo: GetOffersInfoReturnType[1] = [];

  const getOffersInfoRes = await setTryTimeout(
    "get offers info from indexer",
    async () => {
      [offerInfoErrors, offersInfo] = await getOffersInfo(createdOffers);

      if (offerInfoErrors.length > 0) {
        throw new Error("Not all offers info received");
      }

      return { ok: true };
    },
    (error) => {
      return { error };
    },
    20_000,
    2_000,
  );

  if ("error" in getOffersInfoRes && offerInfoErrors.length === 0) {
    commandObj.warn(stringifyUnknown(getOffersInfoRes.error));
  }

  const offersStr = createdOffers
    .map(({ offerName }) => {
      return offerName;
    })
    .join(", ");

  commandObj.logToStderr(`
Offers ${color.yellow(offersStr)} successfully created!

${await offersInfoToString([offerInfoErrors, offersInfo])}
`);
}

function setCPUSupplyForCP(
  computePeersToRegister: {
    peerId: Uint8Array;
    unitIds: Uint8Array[];
    resourcesByType: {
      readonly cpu: {
        readonly resourceId: string;
        readonly details: string;
        readonly name: string;
        readonly supply: number;
      };
    };
    owner: string;
  }[],
) {
  return computePeersToRegister.map(
    ({
      peerId,
      unitIds,
      resourcesByType: { cpu, ...restResources },
      owner,
    }) => {
      return {
        peerId,
        unitIds,
        resources: [
          setCPUSupply(cpu, unitIds),
          ...resourcesByTypeToArr(restResources),
        ],
        owner,
      };
    },
  );
}

function setCPUSupply(
  cpu: {
    readonly resourceId: string;
    readonly details: string;
    readonly name: string;
    readonly supply: number;
  },
  unitIds: Uint8Array[],
): OnChainResource {
  return { ...cpu, supply: unitIds.length * VCPU_PER_CU };
}

async function confirmOffer(offer: EnsureOfferConfig) {
  return confirm({
    message: `The following offer will be created: ${color.yellow(offer.offerName)}\n${yamlDiffPatch(
      "",
      {},
      {
        "Data Center": offer.dataCenter,
        "Resource Prices": {
          CPU: await formatOfferResourcePrice("cpu", offer),
          RAM: await formatOfferResourcePrice("ram", offer),
          Storage: await formatOfferResourcePrice("storage", offer),
          IP: await formatOfferResourcePrice("ip", offer),
          Bandwidth: await formatOfferResourcePrice("bandwidth", offer),
        },
        "Compute Peers": await Promise.all(
          offer.computePeersFromProviderConfig.map(
            async ({ name, peerIdBase58, resourcesByType }) => {
              return {
                Name: name,
                "Peer ID": peerIdBase58,
                Resources: {
                  CPU: await formatOfferResource("cpu", resourcesByType.cpu),
                  RAM: await formatOfferResource("ram", resourcesByType.ram),
                  Storage: await Promise.all(
                    resourcesByType.storage.map(async (storage) => {
                      return await formatOfferResource("storage", storage);
                    }),
                  ),
                  IP: await formatOfferResource("ip", resourcesByType.ip),
                  Bandwidth: await formatOfferResource(
                    "bandwidth",
                    resourcesByType.bandwidth,
                  ),
                },
              };
            },
          ),
        ),
      },
    )}\nDo you want to proceed?`,
    default: true,
  });
}

function formatOfferResourcePrice(
  resourceType: ResourceType,
  offer: {
    resourcePricesWithIds: Record<
      ResourceType,
      Array<{ resourceId: string; price: bigint }>
    >;
  },
) {
  return Promise.all(
    offer.resourcePricesWithIds[resourceType].map(
      async ({ resourceId, price }) => {
        return {
          "Resource ID": resourceId,
          Price: await ptFormatWithSymbol(price),
        };
      },
    ),
  );
}

async function formatOfferResource(
  resourceType: ResourceType,
  {
    resourceId,
    supply,
    details,
  }: {
    resourceId: string;
    supply: number;
    details: string;
  },
) {
  return {
    "Resource ID": resourceId,
    Supply: (await resourceSupplyFromChainToConfig(resourceType, supply))
      .supplyString,
    ...(details === "{}" ? {} : { Details: details }),
  };
}

type AddRemainingCPsOrCUsArgs = {
  allCPs: CPFromProviderConfig[];
  addedCPs: CPFromProviderConfig[];
  offerId: string;
  offerName: string;
};

export async function addRemainingCPs({
  allCPs,
  addedCPs = [],
  offerId,
  offerName,
}: Omit<AddRemainingCPsOrCUsArgs, "addedCPs"> & {
  addedCPs?: CPFromProviderConfig[];
}) {
  const { contracts } = await getContracts();
  let totalAddedCPs = addedCPs.length;
  const addedCPsNames = [];

  while (totalAddedCPs < allCPs.length) {
    const remainingCPs = allCPs.slice(totalAddedCPs);

    const CUsToRegisterCount = remainingCPs.flatMap(({ unitIds }) => {
      return unitIds;
    }).length;

    const { registeredValues: addedCPs } = await guessTxSizeAndSign({
      sliceValuesToRegister: sliceCPsByNumberOfCUs(remainingCPs),
      sliceIndex: CUsToRegisterCount,
      getArgs(CPsToRegister) {
        return [offerId, setCPUSupplyForCP(CPsToRegister)];
      },
      getTitle({ valuesToRegister: CPsToRegister }) {
        return `Add compute peers:\n${CPsToRegister.map(
          ({ name, peerIdBase58 }) => {
            return `${name} (${peerIdBase58})`;
          },
        ).join("\n")}\n\nto offer ${offerName} (${offerId})`;
      },
      method: contracts.diamond.addComputePeersV2,
    });

    await addRemainingCUs({
      allCPs: remainingCPs,
      addedCPs,
      offerId,
      offerName,
    });

    addedCPsNames.push(
      ...addedCPs.map(({ name }) => {
        return name;
      }),
    );

    totalAddedCPs = totalAddedCPs + addedCPs.length;
  }

  return { addedCPsNames };
}

async function addRemainingCUs({
  allCPs,
  addedCPs,
  offerId,
  offerName,
}: AddRemainingCPsOrCUsArgs) {
  const { contracts } = await getContracts();
  const lastRegisteredCP = addedCPs[addedCPs.length - 1];
  const lastRegisteredCPFromAllCPs = allCPs[addedCPs.length - 1];

  if (
    lastRegisteredCP === undefined ||
    lastRegisteredCPFromAllCPs === undefined
  ) {
    return;
  }

  const remainingCUsArr = lastRegisteredCPFromAllCPs.unitIds.slice(
    lastRegisteredCP.unitIds.length,
  );

  const {
    peerId,
    peerIdBase58,
    name: cpName,
    resourcesByType,
  } = lastRegisteredCPFromAllCPs;

  let totalRegisteredCUsCount = 0;

  while (totalRegisteredCUsCount < remainingCUsArr.length) {
    const CUs = remainingCUsArr.slice(totalRegisteredCUsCount);

    const { sliceIndex: registeredCUsCount } = await guessTxSizeAndSign({
      sliceValuesToRegister(sliceIndex) {
        return CUs.slice(0, sliceIndex);
      },
      sliceIndex: CUs.length,
      getArgs(CUsToRegister) {
        return [
          peerId,
          CUsToRegister,
          setCPUSupply(resourcesByType.cpu, CUsToRegister),
        ];
      },
      getTitle({ sliceCount: numberOfCUsForAddCU }) {
        return `Add ${numToStr(numberOfCUsForAddCU)} compute units\nto compute peer ${cpName} (${peerIdBase58})\nfor offer ${offerName} (${offerId})`;
      },
      method: contracts.diamond.addComputeUnitsV2,
    });

    totalRegisteredCUsCount = totalRegisteredCUsCount + registeredCUsCount;
  }
}

function sliceCPsByNumberOfCUs(computePeers: CPFromProviderConfig[]) {
  return (sliceIndex: number): CPFromProviderConfig[] => {
    const res: CPFromProviderConfig[] = [];
    let resN = 0;

    for (const cp of computePeers) {
      const resCP: CPFromProviderConfig = { ...cp, unitIds: [] };

      for (const unitId of cp.unitIds) {
        resCP.unitIds.push(unitId);
        resN++;

        if (resN === sliceIndex) {
          res.push(resCP);
          return res;
        }
      }

      res.push(resCP);
    }

    return res;
  };
}

export async function offersInfoToString([
  offersInfoErrors,
  offersInfos,
]: Awaited<ReturnType<typeof getOffersInfo>>) {
  const offerInfoErrorsStr =
    offersInfoErrors.length > 0
      ? `${color.red(
          "Wasn't able to get the following offers from indexer:",
        )}\n${offersInfoErrors
          .map((offer) => {
            return `${offer.offerName === undefined ? "" : `${offer.offerName}: `}${offer.offerId}`;
          })
          .join("\n\n")}`
      : "";

  const offersInfoStr =
    offersInfos.length > 0
      ? `${color.green("Got offers info from indexer:")}\n\n${(
          await Promise.all(
            offersInfos.map(async (offerInfo) => {
              return `Offer: ${color.yellow(
                offerInfo.offerName ?? offerInfo.offerIndexerInfo.id,
              )}\n${await formatOfferInfo(offerInfo.offerIndexerInfo)}`;
            }),
          )
        ).join("\n\n")}`
      : "";

  return [offerInfoErrorsStr, offersInfoStr]
    .filter((info) => {
      return info !== "";
    })
    .join("\n\n");
}

async function formatOfferInfo(
  offerIndexerInfo: Awaited<
    ReturnType<typeof getOffersInfo>
  >[1][number]["offerIndexerInfo"],
) {
  return yamlDiffPatch(
    "",
    {},
    {
      "Provider ID": offerIndexerInfo.providerId,
      "Offer ID": offerIndexerInfo.id,
      "Data Center": offerIndexerInfo.dataCenter,
      "Created At": offerIndexerInfo.createdAt,
      "Last Updated At": offerIndexerInfo.updatedAt,
      "Resource Prices": offerIndexerInfo.resources?.map(
        ({ resourceId, resourcePrice }) => {
          return {
            "Resource ID": resourceId,
            Price: bigintToStr(resourcePrice),
          };
        },
      ),
      "Total compute units": offerIndexerInfo.totalComputeUnits,
      "Free compute units": offerIndexerInfo.freeComputeUnits,
      Peers: await Promise.all(
        offerIndexerInfo.peers.map(
          async ({ id, computeUnits, resourcesByType }) => {
            return {
              "Peer ID": await peerIdHexStringToBase58String(id),
              "CU Count": computeUnits.length,
              Resources: {
                CPU: {
                  "Resource ID": resourcesByType.cpu.resourceId,
                  Supply: (
                    await resourceSupplyFromChainToConfig(
                      "cpu",
                      resourcesByType.cpu.supply,
                    )
                  ).supplyString,
                  Details: resourcesByType.cpu.details,
                },
                RAM: {
                  "Resource ID": resourcesByType.ram.resourceId,
                  Supply: (
                    await resourceSupplyFromChainToConfig(
                      "ram",
                      resourcesByType.ram.supply,
                    )
                  ).supplyString,
                  Details: resourcesByType.ram.details,
                },
                Storage: await Promise.all(
                  resourcesByType.storage.map(async (storage) => {
                    return {
                      "Resource ID": storage.resourceId,
                      Supply: (
                        await resourceSupplyFromChainToConfig(
                          "storage",
                          storage.supply,
                        )
                      ).supplyString,
                      Details: storage.details,
                    };
                  }),
                ),
                IP: {
                  "Resource ID": resourcesByType.ip.resourceId,
                  Supply: (
                    await resourceSupplyFromChainToConfig(
                      "ip",
                      resourcesByType.ip.supply,
                    )
                  ).supplyString,
                  Details: resourcesByType.ip.details,
                },
                Bandwidth: {
                  "Resource ID": resourcesByType.bandwidth.resourceId,
                  Supply: (
                    await resourceSupplyFromChainToConfig(
                      "bandwidth",
                      resourcesByType.bandwidth.supply,
                    )
                  ).supplyString,
                  Details: resourcesByType.bandwidth.details,
                },
              },
            };
          },
        ),
      ),
    },
  );
}

export async function resolveOffersFromProviderConfig(
  flags: OffersArgs,
): Promise<EnsureOfferConfig[]> {
  if (
    flags[OFFER_FLAG_NAME] !== undefined &&
    flags[OFFER_IDS_FLAG_NAME] !== undefined
  ) {
    commandObj.error(
      `You can't use both ${color.yellow(
        `--${OFFER_FLAG_NAME}`,
      )} and ${color.yellow(
        `--${OFFER_IDS_FLAG_NAME}`,
      )} flags at the same time. Please pick one of them`,
    );
  }

  const allOffers = await ensureOfferConfigs();

  if (flags[OFFER_IDS_FLAG_NAME] !== undefined) {
    const offerIdsFromFlags = commaSepStrToArr(flags[OFFER_IDS_FLAG_NAME]);
    const offerIdsFromFlagsSet = new Set(offerIdsFromFlags);

    const offersDefinedLocally = allOffers.filter(({ offerId }) => {
      return offerId !== undefined && offerIdsFromFlagsSet.has(offerId);
    });

    const offersDefinedLocallySet = new Set(
      offersDefinedLocally.map(({ offerId }) => {
        return offerId;
      }),
    );

    const offerIdsNotDefinedLocally = offerIdsFromFlags.filter((offerId) => {
      return !offersDefinedLocallySet.has(offerId);
    });

    const [offerInfosErrors, offerInfos] = await getOffersInfo(
      offerIdsNotDefinedLocally.map((offerId) => {
        return { offerId };
      }),
    );

    if (offerInfosErrors.length > 0) {
      commandObj.warn(
        `Wasn't able to get info about the following offers from indexer:\n\n${offerInfosErrors
          .map(({ offerId }) => {
            return offerId;
          })
          .join("\n")}`,
      );
    }

    const protocolVersionsFromChain = await getProtocolVersions();

    const offersNotDefinedLocally = await Promise.all(
      offerInfos.map(async ({ offerId, offerIndexerInfo }) => {
        const resourcePricesWithIds = (
          offerIndexerInfo.resources ?? []
        ).reduce<ResourcePricesWithIds>(
          (acc, { resourceId, resourcePrice, resource: { type } }) => {
            if (
              !isOnChainResourceType(type) ||
              type === OnChainResourceType.GPU
            ) {
              return acc;
            }

            const resourceType = onChainResourceTypeToResourceType[type];

            acc[resourceType].push({
              ty: type,
              resourceType,
              resourceId,
              resourceName: resourceId,
              price: resourcePrice,
            });

            return acc;
          },
          {
            cpu: [],
            ram: [],
            storage: [],
            ip: [],
            bandwidth: [],
          },
        );

        const computePeersFromProviderConfig = await Promise.all(
          offerIndexerInfo.peers.map(
            async ({ computeUnits, resourcesByType, id }, i) => {
              const peerIdBase58 = await peerIdHexStringToBase58String(id);

              const resourcesByTypeWithName = {
                cpu: {
                  ...resourcesByType.cpu,
                  name: resourcesByType.cpu.resourceId,
                },
                ram: {
                  ...resourcesByType.ram,
                  name: resourcesByType.ram.resourceId,
                },
                storage: resourcesByType.storage.map((res) => {
                  return { ...res, name: res.resourceId };
                }),
                ip: {
                  ...resourcesByType.ip,
                  name: resourcesByType.ip.resourceId,
                },
                bandwidth: {
                  ...resourcesByType.bandwidth,
                  name: resourcesByType.bandwidth.resourceId,
                },
              };

              return {
                name: `Peer #${numToStr(i)}`,
                peerIdBase58,
                peerId: await peerIdBase58ToUint8Array(peerIdBase58),
                unitIds: computeUnits.map(({ id }) => {
                  return new Uint8Array(Buffer.from(id.slice(2), "hex"));
                }),
                owner: offerIndexerInfo.providerId,
                resourcesByType: resourcesByTypeWithName,
              };
            },
          ),
        );

        const { dataCenter } = offerIndexerInfo;

        assert(
          dataCenter !== null && dataCenter !== undefined,
          "Data center is always saved for offer on-chain when offer is created. Try waiting for indexer to index the data center",
        );

        assertIsHex(dataCenter.id, "Data center ID must be a hex string");

        return {
          offerName: `Offer ${offerId}`,
          computePeersFromProviderConfig,
          offerId,
          dataCenter: { name: dataCenter.id, ...dataCenter },
          minProtocolVersion: Number(
            protocolVersionsFromChain.minProtocolVersion,
          ),
          maxProtocolVersion: Number(
            protocolVersionsFromChain.maxProtocolVersion,
          ),
          resourcePricesWithIds,
        } satisfies (typeof offersDefinedLocally)[number];
      }),
    );

    return offerIdsFromFlags.flatMap((offerId) => {
      const offer =
        offersDefinedLocally.find((o) => {
          return o.offerId === offerId;
        }) ??
        offersNotDefinedLocally.find((o) => {
          return o.offerId === offerId;
        });

      return offer === undefined ? [] : [offer];
    });
  }

  if (flags[OFFER_FLAG_NAME] === ALL_FLAG_VALUE) {
    return allOffers;
  }

  const providerConfig = await ensureReadonlyProviderConfig();

  if (flags[OFFER_FLAG_NAME] === undefined) {
    return checkboxes<EnsureOfferConfig, never>({
      message: `Select one or more offer names from ${providerConfig.$getPath()}`,
      options: allOffers.map((offer) => {
        return {
          name: offer.offerName,
          value: offer,
        };
      }),
      validate: (choices: string[]) => {
        if (choices.length === 0) {
          return "Please select at least one offer name";
        }

        return true;
      },
      oneChoiceMessage(choice) {
        return `One offer found at ${providerConfig.$getPath()}: ${color.yellow(
          choice,
        )}. Do you want to select it`;
      },
      onNoChoices() {
        commandObj.error(
          `You must have at least one offer specified in ${providerConfig.$getPath()}`,
        );
      },
      flagName: OFFER_FLAG_NAME,
    });
  }

  const [notFoundOffers, offers] = splitErrorsAndResults(
    commaSepStrToArr(flags[OFFER_FLAG_NAME]),
    (offerName) => {
      const offer = allOffers.find((o) => {
        return o.offerName === offerName;
      });

      if (offer === undefined) {
        return { error: offerName };
      }

      return { result: offer };
    },
  );

  if (notFoundOffers.length > 0) {
    commandObj.error(
      `Offers: ${color.yellow(
        notFoundOffers.join(", "),
      )} are not found in the 'offers' section of ${providerConfig.$getPath()}`,
    );
  }

  return offers;
}

export type EnsureOfferConfig = Awaited<
  ReturnType<typeof ensureOfferConfigs>
>[number];

export type OnChainResource = {
  resourceId: string;
  supply: number;
  details: string;
};

type ResourcePricesWithIds = Record<
  ResourceType,
  {
    ty: OnChainResourceType;
    resourceType: ResourceType;
    resourceId: string;
    resourceName: string;
    price: bigint;
  }[]
>;

async function ensureOfferConfigs() {
  const providerConfig = await ensureReadonlyProviderConfig();
  const providerArtifactsConfig = await initProviderArtifactsConfig();
  const { randomBytes } = await import("ethers");
  const fluenceEnv = await ensureFluenceEnv();

  return Promise.all(
    Object.entries(providerConfig.offers).map(
      async ([
        offerName,
        {
          computePeers,
          minProtocolVersion,
          maxProtocolVersion,
          resourcePrices,
          dataCenterName,
        },
      ]) => {
        const computePeerConfigs = await ensureComputerPeerConfigs({
          computePeerNames: computePeers,
        });

        const computePeersFromProviderConfig = await Promise.all(
          computePeerConfigs.map(
            async ({ name, walletAddress, peerId, resourcesWithIds }) => {
              const { id: cpuId, ...cpu } = resourcesWithIds.cpu;
              const { id: ramId, ...ram } = resourcesWithIds.ram;
              const { id: ipId, ...ip } = resourcesWithIds.ip;

              const { id: bandwidthId, ...bandwidth } =
                resourcesWithIds.bandwidth;

              const ipSupplyRes = ipSupplyToIndividualIPs(ip.supply);

              assert(
                "result" in ipSupplyRes,
                "Unreachable. Config is validated so it must return result",
              );

              const xbytes = (await import("xbytes")).default;

              const resources = {
                cpu: {
                  ...cpu,
                  supply: (
                    await resourceSupplyFromConfigToChain("cpu", cpu.supply)
                  ).supply,
                  resourceId: cpuId,
                  details: JSON.stringify(cpu.details),
                },
                ram: {
                  ...ram,
                  supply: (
                    await resourceSupplyFromConfigToChain(
                      "ram",
                      xbytes.parseSize(ram.supply),
                    )
                  ).supply,
                  resourceId: ramId,
                  details: JSON.stringify(ram.details),
                },
                storage: await Promise.all(
                  resourcesWithIds.storage.map(
                    async ({ id: storageId, ...storage }) => {
                      return {
                        ...storage,
                        supply: (
                          await resourceSupplyFromConfigToChain(
                            "storage",
                            xbytes.parseSize(storage.supply),
                          )
                        ).supply,
                        resourceId: storageId,
                        details: JSON.stringify(storage.details),
                      } as const;
                    },
                  ),
                ),
                ip: {
                  ...ip,
                  supply: (
                    await resourceSupplyFromConfigToChain(
                      "ip",
                      ip.supply.length,
                    )
                  ).supply,
                  resourceId: ipId,
                  details: JSON.stringify({}),
                },
                bandwidth: {
                  ...bandwidth,
                  supply: (
                    await resourceSupplyFromConfigToChain(
                      "bandwidth",
                      xbytes.parseSize(bandwidth.supply),
                    )
                  ).supply,
                  resourceId: bandwidthId,
                  details: JSON.stringify({}),
                },
              } as const satisfies Record<
                ResourceType,
                OnChainResource[] | OnChainResource
              >;

              return {
                name,
                peerIdBase58: peerId,
                peerId: await peerIdBase58ToUint8Array(peerId),
                unitIds: times(resourcesWithIds.cpu.supply).map(() => {
                  return randomBytes(32);
                }),
                resourcesByType: resources,
                owner: walletAddress,
              };
            },
          ),
        );

        const offerId =
          providerArtifactsConfig?.offers[fluenceEnv]?.[offerName]?.id;

        const getResourcePricesWithIds =
          createGetResourcePricesWithIds(resourcePrices);

        const resourcePricesWithIds: ResourcePricesWithIds = {
          cpu: await getResourcePricesWithIds("cpu"),
          ram: await getResourcePricesWithIds("ram"),
          storage: await getResourcePricesWithIds("storage"),
          ip: await getResourcePricesWithIds("ip"),
          bandwidth: await getResourcePricesWithIds("bandwidth"),
        };

        const dataCenter = (await getDataCentersFromChain())[dataCenterName];

        assert(
          dataCenter !== undefined,
          `Unreachable. It's validated in ${PROVIDER_CONFIG_FULL_FILE_NAME} schema that data center names are correct`,
        );

        return {
          offerName,
          computePeersFromProviderConfig,
          offerId,
          minProtocolVersion,
          maxProtocolVersion,
          resourcePricesWithIds,
          dataCenter: { name: dataCenterName, ...dataCenter },
        } as const;
      },
    ),
  );
}

function resourcesByTypeToArr(
  resourcesByType: Partial<
    Record<ResourceType, OnChainResource | OnChainResource[]>
  >,
) {
  return Object.values(resourcesByType).flatMap((resource) => {
    return Array.isArray(resource) ? resource : [resource];
  });
}

type CPFromProviderConfig = Awaited<
  ReturnType<typeof ensureOfferConfigs>
>[number]["computePeersFromProviderConfig"][number];

type OfferNameAndId = {
  offerName?: string;
  offerId: string;
};

type OfferArtifactsArgs = OffersArgs & {
  [OFFER_IDS_FLAG_NAME]: string | undefined;
};

function createGetResourcePricesWithIds(resourcePrices: ResourcePrices) {
  return async function getResourcePricesWithIds(resourceType: ResourceType) {
    const resourcesFromChain = await getResourcesFromChain();
    return Promise.all(
      Object.entries(resourcePrices[resourceType]).map(
        async ([resourceName, price]) => {
          const resource = resourcesFromChain[resourceType][resourceName];

          assert(
            resource !== undefined,
            `Unreachable. It's validated in ${PROVIDER_CONFIG_FULL_FILE_NAME} schema that resource names are correct`,
          );

          return {
            ty: resourceTypeToOnChainResourceType[resourceType],
            resourceType,
            resourceName,
            resourceId: resource.id,
            price: await resourcePriceToBigInt(resourceType, price),
          } as const;
        },
      ),
    );
  };
}

export async function resolveCreatedOffers(flags: OfferArtifactsArgs) {
  if (
    flags[OFFER_FLAG_NAME] !== undefined &&
    flags[OFFER_IDS_FLAG_NAME] !== undefined
  ) {
    commandObj.error(
      `You can't use both ${color.yellow(
        `--${OFFER_FLAG_NAME}`,
      )} and ${color.yellow(
        `--${OFFER_IDS_FLAG_NAME}`,
      )} flags at the same time. Please pick one of them`,
    );
  }

  if (flags[OFFER_IDS_FLAG_NAME] !== undefined) {
    return commaSepStrToArr(flags[OFFER_IDS_FLAG_NAME]).map((offerId, i) => {
      return { offerName: `#${numToStr(i)}`, offerId };
    });
  }

  const providerArtifactsConfig = await initProviderArtifactsConfig();

  if (providerArtifactsConfig === null) {
    return commandObj.error(
      `${PROVIDER_ARTIFACTS_CONFIG_FULL_FILE_NAME} is missing. Make sure you created offers using '${CLI_NAME} provider offer-create' command.`,
    );
  }

  const fluenceEnv = await ensureFluenceEnv();

  const allOffers = Object.entries(
    providerArtifactsConfig.offers[fluenceEnv] ?? {},
  ).map(([offerName, { id }]) => {
    return { offerName, offerId: id };
  });

  if (flags[OFFER_FLAG_NAME] === ALL_FLAG_VALUE) {
    return allOffers;
  }

  if (flags[OFFER_FLAG_NAME] === undefined) {
    return checkboxes<OfferNameAndId, never>({
      message: `Select one or more offer names from ${providerArtifactsConfig.$getPath()}`,
      options: allOffers.map((offer) => {
        return {
          name: offer.offerName,
          value: offer,
        };
      }),
      validate: (choices: string[]) => {
        if (choices.length === 0) {
          return "Please select at least one offer name";
        }

        return true;
      },
      oneChoiceMessage(choice) {
        return `One offer found at ${providerArtifactsConfig.$getPath()}: ${color.yellow(
          choice,
        )}. Do you want to select it`;
      },
      onNoChoices() {
        commandObj.error(
          `You must have at least one offer specified in ${providerArtifactsConfig.$getPath()}`,
        );
      },
      flagName: OFFER_FLAG_NAME,
    });
  }

  const [notFoundOffers, foundOffers] = splitErrorsAndResults(
    commaSepStrToArr(flags[OFFER_FLAG_NAME]),
    (offerName) => {
      const offer = allOffers.find((o) => {
        return o.offerName === offerName;
      });

      if (offer === undefined) {
        return { error: offerName };
      }

      return { result: offer };
    },
  );

  if (notFoundOffers.length > 0) {
    commandObj.error(
      `Offers: ${color.yellow(
        notFoundOffers.join(", "),
      )} are not found in 'offers' section of ${providerArtifactsConfig.$getPath()}`,
    );
  }

  return foundOffers;
}

export async function getOffersInfo<T extends OfferNameAndId>(
  offers: T[],
): Promise<
  [
    T[],
    (T & {
      offerIndexerInfo: Awaited<ReturnType<typeof serializeOfferInfo>>;
    })[],
  ]
> {
  if (offers.length === 0) {
    return [[], []];
  }

  const offersIndexerInfo = await getOffers(
    offers.map(({ offerId }) => {
      return offerId;
    }),
  );

  const offersInfoMap = Object.fromEntries(
    offersIndexerInfo.offers.map((o) => {
      return [o.id, o] as const;
    }),
  );

  const [errors, results] = splitErrorsAndResults(offers, (offer) => {
    const offerIndexerInfo = offersInfoMap[offer.offerId];

    return offerIndexerInfo === undefined
      ? { error: offer }
      : { result: { offer, offerIndexerInfo } };
  });

  return [
    errors,
    results.map(({ offerIndexerInfo, offer }) => {
      return {
        ...offer,
        offerIndexerInfo: serializeOfferInfo(offerIndexerInfo),
      };
    }),
  ] as const;
}

type OfferIndexerInfo = Awaited<ReturnType<typeof getOffers>>["offers"][number];

function indexerResourcesToOnchainResources(
  resourceType: ResourceType,
  resources: NonNullable<
    NonNullable<OfferIndexerInfo["peers"]>[number]["resources"]
  >,
  offerId: string,
): [OnChainResource, ...OnChainResource[]] {
  const onChainResourceType = resourceTypeToOnChainResourceType[resourceType];

  const [firstResource, ...restResources] = resources
    .filter(({ resource: { type } }) => {
      return isOnChainResourceType(type) && type === onChainResourceType;
    })
    .map(({ details, resource: { id: resourceId }, maxSupply }) => {
      assertIsHex(resourceId, `Invalid Resource ID for offer ${offerId}`);
      return { resourceId, supply: Number(maxSupply), details };
    });

  if (firstResource === undefined) {
    throw new Error(
      `Resource of type ${resourceType} not found in indexer for offer ${offerId}`,
    );
  }

  return [firstResource, ...restResources];
}

function serializeOfferInfo(offerIndexerInfo: OfferIndexerInfo) {
  const serializedPeers =
    offerIndexerInfo.peers?.map(({ id, computeUnits, resources }) => {
      if (resources === null || resources === undefined) {
        throw new Error(
          `Resources for peer ${id} are not found in indexer for offer ${offerIndexerInfo.id}`,
        );
      }

      const resourcesByType = {
        cpu: indexerResourcesToOnchainResources(
          "cpu",
          resources,
          offerIndexerInfo.id,
        )[0],
        ram: indexerResourcesToOnchainResources(
          "ram",
          resources,
          offerIndexerInfo.id,
        )[0],
        storage: indexerResourcesToOnchainResources(
          "storage",
          resources,
          offerIndexerInfo.id,
        ),
        ip: indexerResourcesToOnchainResources(
          "ip",
          resources,
          offerIndexerInfo.id,
        )[0],
        bandwidth: indexerResourcesToOnchainResources(
          "bandwidth",
          resources,
          offerIndexerInfo.id,
        )[0],
      } as const satisfies Record<
        ResourceType,
        OnChainResource | OnChainResource[]
      >;

      return {
        id,
        resourcesByType,
        computeUnits:
          computeUnits?.map((computeUnit) => {
            return {
              id: computeUnit.id,
              workerId: computeUnit.worker?.id,
            };
          }) ?? [],
      };
    }) ?? [];

  return {
    id: offerIndexerInfo.id,
    dataCenter: offerIndexerInfo.datacenter,
    createdAt: new Date(
      Number(offerIndexerInfo.createdAt) * 1000,
    ).toISOString(),
    updatedAt: new Date(
      Number(offerIndexerInfo.updatedAt) * 1000,
    ).toISOString(),
    paymentToken: {
      address: offerIndexerInfo.paymentToken.id,
    },
    totalComputeUnits: offerIndexerInfo.computeUnitsTotal,
    freeComputeUnits: offerIndexerInfo.computeUnitsAvailable,
    providerId: offerIndexerInfo.provider.id,
    peers: serializedPeers,
    resources: offerIndexerInfo.resources?.map(({ price, resource }) => {
      const resourceId = resource.id;

      assertIsHex(
        resourceId,
        `Invalid Resource ID for offer ${offerIndexerInfo.id}`,
      );

      return { resourceId, resourcePrice: BigInt(price), resource };
    }),
  };
}
