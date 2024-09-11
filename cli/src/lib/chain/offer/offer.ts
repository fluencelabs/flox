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

import type { IMarket } from "@fluencelabs/deal-ts-clients";
import type { OfferDetail } from "@fluencelabs/deal-ts-clients/dist/dealCliClient/types/schemes.js";
import { color } from "@oclif/color";
import type { TransactionReceipt } from "ethers";
import times from "lodash-es/times.js";
import { yamlDiffPatch } from "yaml-diff-patch";

import { jsonStringify } from "../../../common.js";
import { versions } from "../../../versions.js";
import { commandObj } from "../../commandObj.js";
import {
  ensureComputerPeerConfigs,
  ensureReadonlyProviderConfig,
} from "../../configs/project/provider.js";
import {
  initNewProviderArtifactsConfig,
  initReadonlyProviderArtifactsConfig,
} from "../../configs/project/providerArtifacts.js";
import {
  ALL_FLAG_VALUE,
  CLI_NAME,
  PT_SYMBOL,
  OFFER_FLAG_NAME,
  OFFER_IDS_FLAG_NAME,
  PROVIDER_ARTIFACTS_CONFIG_FULL_FILE_NAME,
} from "../../const.js";
import { dbg } from "../../dbg.js";
import {
  getDealClient,
  getDealCliClient,
  getSignerAddress,
  guessTxSizeAndSign,
  getEventValue,
} from "../../dealClient.js";
import { startSpinner, stopSpinner } from "../../helpers/spinner.js";
import { numToStr } from "../../helpers/typesafeStringify.js";
import {
  commaSepStrToArr,
  setTryTimeout,
  splitErrorsAndResults,
  stringifyUnknown,
} from "../../helpers/utils.js";
import { checkboxes } from "../../prompt.js";
import { ensureFluenceEnv } from "../../resolveFluenceEnv.js";
import {
  cidStringToCIDV1Struct,
  peerIdHexStringToBase58String,
  peerIdToUint8Array,
} from "../conversions.js";
import { ptParse } from "../currencies.js";
import { assertProviderIsRegistered } from "../providerInfo.js";

const MARKET_OFFER_REGISTERED_EVENT_NAME = "MarketOfferRegistered";
const OFFER_ID_PROPERTY = "offerId";

export type OffersArgs = {
  [OFFER_FLAG_NAME]?: string | undefined;
  force?: boolean | undefined;
};

export async function createOffers(flags: OffersArgs) {
  const allOffers = await resolveOffersFromProviderConfig(flags);
  const { dealClient } = await getDealClient();
  const market = dealClient.getMarket();
  const usdc = dealClient.getUSDC();
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

  const usdcAddress = await usdc.getAddress();

  // Multicall here is not working for some reason:
  // Event 'MarketOfferRegistered' with hash '0x8090f06b11ff71e91580cf20918a29fefe5fcb76bc8819d550d1aef761382a99' not found in logs of the successful transaction. Try updating Fluence CLI to the latest version

  // const registerMarketOfferTxReceipts = await signBatch(
  //   offers.map(
  //     ({
  //       computePeersToRegister,
  //       effectorPrefixesAndHash,
  //       minPricePerCuPerEpochBigInt,
  //     }) => {
  //       return [
  //         market.registerMarketOffer,
  //         minPricePerCuPerEpochBigInt,
  //         usdcAddress,
  //         effectorPrefixesAndHash,
  //         computePeersToRegister,
  //       ];
  //     },
  //   ),
  // );

  // if (registerMarketOfferTxReceipts === undefined) {
  //   return commandObj.error("No offers to create");
  // }

  // const notValidatedOfferIds = getEventValueFromReceipts({
  //   contract: market,
  //   eventName: MARKET_OFFER_REGISTERED_EVENT_NAME,
  //   txReceipts: registerMarketOfferTxReceipts,
  //   value: OFFER_ID_PROPERTY,
  // });

  const registeredMarketOffers: (
    | { result: { offerId: string; offerName: string } }
    | { error: string }
  )[] = [];

  for (const offer of offers) {
    const {
      computePeersFromProviderConfig,
      effectorPrefixesAndHash,
      minPricePerCuPerEpochBigInt,
      offerName,
      minProtocolVersion = versions.protocolVersion,
      maxProtocolVersion = versions.protocolVersion,
    } = offer;

    function getOfferIdRes(txReceipt: TransactionReceipt) {
      const offerId = getEventValue({
        contract: market,
        eventName: MARKET_OFFER_REGISTERED_EVENT_NAME,
        txReceipt,
        value: OFFER_ID_PROPERTY,
      });

      return typeof offerId === "string"
        ? { result: { offerId, offerName } }
        : {
            error: `for ${color.yellow(
              offerName,
            )} instead of offer id got: ${stringifyUnknown(offerId)} from ${MARKET_OFFER_REGISTERED_EVENT_NAME} event`,
          };
    }

    const allCUs = computePeersFromProviderConfig.flatMap(({ unitIds }) => {
      return unitIds;
    });

    const REGISTER_OFFER_TITLE = `Register offer: ${offerName}`;

    try {
      const {
        sliceIndex: registeredCUsCount,
        registeredValues: registeredCPs,
        txReceipt: offerRegisterTxReceipt,
      } = await guessTxSizeAndSign({
        sliceValuesToRegister: sliceCPsByNumberOfCUs(
          computePeersFromProviderConfig,
        ),
        sliceIndex: allCUs.length,
        getArgs(computePeersToRegister) {
          return [
            minPricePerCuPerEpochBigInt,
            usdcAddress,
            effectorPrefixesAndHash,
            computePeersToRegister,
            minProtocolVersion,
            maxProtocolVersion,
          ];
        },
        getTitle() {
          return REGISTER_OFFER_TITLE;
        },
        method: market.registerMarketOffer,
        validateAddress: assertProviderIsRegistered,
      });

      let totalRegisteredCPs = registeredCPs.length;
      const offerIdRes = getOfferIdRes(offerRegisterTxReceipt);
      registeredMarketOffers.push(offerIdRes);

      if ("error" in offerIdRes || registeredCUsCount === allCUs.length) {
        continue;
      }

      const { offerId } = offerIdRes.result;

      await addRemainingCUsToCPs({
        allCPs: computePeersFromProviderConfig,
        registeredCPs,
        offerId,
        market,
        offerName,
      });

      while (totalRegisteredCPs < computePeersFromProviderConfig.length) {
        totalRegisteredCPs =
          totalRegisteredCPs +
          (await addCPs({
            CPs: computePeersFromProviderConfig.slice(totalRegisteredCPs),
            offerId,
            market,
            offerName,
          }));
      }
    } catch (e) {
      commandObj.warn(
        `Error when creating offer ${offerName}: ${stringifyUnknown(e)}`,
      );
    }
  }

  const [offerIdErrors, offerIds] = splitErrorsAndResults(
    registeredMarketOffers,
    (res) => {
      return res;
    },
  );

  if (offerIdErrors.length > 0) {
    commandObj.warn(
      `When getting ${OFFER_ID_PROPERTY} property from event ${MARKET_OFFER_REGISTERED_EVENT_NAME}:\n\n${offerIdErrors.join(
        ", ",
      )}`,
    );
  }

  if (offerIds.length === 0) {
    commandObj.logToStderr("No offers created");
    return;
  }

  type GetOffersInfoReturnType = Awaited<
    ReturnType<typeof getOffersInfo<(typeof offerIds)[number]>>
  >;

  let offerInfoErrors: GetOffersInfoReturnType[0] = [];
  let offersInfo: GetOffersInfoReturnType[1] = [];

  const getOffersInfoRes = await setTryTimeout(
    "Getting offers info from indexer",
    async () => {
      [offerInfoErrors, offersInfo] = await getOffersInfo(offerIds);

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

  const providerAddress = await getSignerAddress();

  offerIds.forEach(({ offerName, offerId }) => {
    const offerPerEnv = providerArtifactsConfig.offers[fluenceEnv] ?? {};
    offerPerEnv[offerName] = { id: offerId, providerAddress };
    providerArtifactsConfig.offers[fluenceEnv] = offerPerEnv;
  });

  await providerArtifactsConfig.$commit();

  const offersStr = offerIds
    .map(({ offerName }) => {
      return offerName;
    })
    .join(", ");

  commandObj.logToStderr(`
Offers ${color.yellow(offersStr)} successfully created!

${await offersInfoToString([offerInfoErrors, offersInfo])}
`);
}

async function addCPs({
  CPs,
  offerId,
  market,
  offerName,
}: {
  CPs: CPFromProviderConfig[];
  offerId: string;
  market: IMarket;
  offerName: string;
}) {
  const CUsToRegisterCount = CPs.flatMap(({ unitIds }) => {
    return unitIds;
  }).length;

  const { registeredValues: registeredCPs } = await guessTxSizeAndSign({
    sliceValuesToRegister: sliceCPsByNumberOfCUs(CPs),
    sliceIndex: CUsToRegisterCount,
    getArgs(CPsToRegister) {
      return [offerId, CPsToRegister];
    },
    getTitle({ valuesToRegister: CPsToRegister }) {
      return `Add compute peers:${CPsToRegister.map(
        ({ name, peerIdBase58 }) => {
          return `${name} (${peerIdBase58})`;
        },
      ).join("\n")}\n\nto offer ${offerName} (${offerId})`;
    },
    method: market.addComputePeers,
  });

  await addRemainingCUsToCPs({
    allCPs: CPs,
    registeredCPs,
    offerId,
    market,
    offerName,
  });

  return registeredCPs.length;
}

async function addRemainingCUsToCPs({
  allCPs,
  registeredCPs,
  offerId,
  market,
  offerName,
}: {
  allCPs: CPFromProviderConfig[];
  registeredCPs: CPFromProviderConfig[];
  offerId: string;
  market: IMarket;
  offerName: string;
}) {
  const lastRegisteredCP = registeredCPs[registeredCPs.length - 1];
  const lastRegisteredCPFromAllCPs = allCPs[registeredCPs.length - 1];

  assert(
    lastRegisteredCP !== undefined && lastRegisteredCPFromAllCPs !== undefined,
    "Unreachable. lastRegisteredCP or lastRegisteredCPFromAllCPs can't be undefined here",
  );

  const remainingCUsArr = lastRegisteredCPFromAllCPs.unitIds.slice(
    lastRegisteredCP.unitIds.length,
  );

  const { peerId, peerIdBase58, name: cpName } = lastRegisteredCPFromAllCPs;
  let totalRegisteredCUsCount = 0;

  while (totalRegisteredCUsCount < remainingCUsArr.length) {
    totalRegisteredCUsCount =
      totalRegisteredCUsCount +
      (await addCUs({
        CUs: remainingCUsArr.slice(totalRegisteredCUsCount),
        offerId,
        market,
        offerName,
        cpName,
        peerId,
        peerIdBase58,
      }));
  }
}

async function addCUs({
  CUs,
  offerId,
  market,
  offerName,
  cpName,
  peerId,
  peerIdBase58,
}: {
  CUs: Uint8Array[];
  offerId: string;
  market: IMarket;
  offerName: string;
  cpName: string;
  peerIdBase58: string;
  peerId: Uint8Array;
}) {
  const { sliceIndex: registeredCUsCount } = await guessTxSizeAndSign({
    sliceValuesToRegister(sliceIndex) {
      return CUs.slice(0, sliceIndex);
    },
    sliceIndex: CUs.length,
    getArgs(CUsToRegister) {
      return [peerId, CUsToRegister];
    },
    getTitle({ sliceCount: numberOfCUsForAddCU }) {
      return `Add ${numToStr(numberOfCUsForAddCU)} compute units\nto compute peer ${cpName} (${peerIdBase58})\nfor offer ${offerName} (${offerId})`;
    },
    method: market.addComputeUnits,
  });

  return registeredCUsCount;
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
      "Created At": new Date(offerIndexerInfo.createdAt * 1000).toISOString(),
      "Last Updated At": new Date(
        offerIndexerInfo.updatedAt * 1000,
      ).toISOString(),
      "Price Per Epoch": `${offerIndexerInfo.pricePerEpoch} ${PT_SYMBOL}`,
      Effectors: await Promise.all(
        offerIndexerInfo.effectors.map(({ cid }) => {
          return cid;
        }),
      ),
      "Total compute units": offerIndexerInfo.totalComputeUnits,
      "Free compute units": offerIndexerInfo.freeComputeUnits,
      Peers: await Promise.all(
        offerIndexerInfo.peers.map(async ({ id, computeUnits }) => {
          return {
            "Peer ID": await peerIdHexStringToBase58String(id),
            "CU Count": computeUnits.length,
          };
        }),
      ),
    },
  );
}

export async function resolveOffersFromProviderConfig(
  flags: OffersArgs,
): Promise<EnsureOfferConfig[]> {
  const allOffers = await ensureOfferConfigs();

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

async function ensureOfferConfigs() {
  const providerConfig = await ensureReadonlyProviderConfig();
  const providerArtifactsConfig = await initReadonlyProviderArtifactsConfig();

  const { ethers } = await import("ethers");
  const fluenceEnv = await ensureFluenceEnv();

  return Promise.all(
    Object.entries(providerConfig.offers).map(
      async ([
        offerName,
        {
          minPricePerCuPerEpoch,
          effectors,
          computePeers,
          minProtocolVersion,
          maxProtocolVersion,
        },
      ]) => {
        const computePeerConfigs =
          await ensureComputerPeerConfigs(computePeers);

        const minPricePerCuPerEpochBigInt = await ptParse(
          minPricePerCuPerEpoch,
        );

        const computePeersFromProviderConfig = await Promise.all(
          computePeerConfigs.map(
            async ({ computeUnits, name, walletAddress, peerId }) => {
              return {
                name,
                peerIdBase58: peerId,
                peerId: await peerIdToUint8Array(peerId),
                unitIds: times(computeUnits).map(() => {
                  return ethers.randomBytes(32);
                }),
                owner: walletAddress,
              };
            },
          ),
        );

        const effectorPrefixesAndHash = await Promise.all(
          (effectors ?? []).map((effector) => {
            return cidStringToCIDV1Struct(effector);
          }),
        );

        const offerId =
          providerArtifactsConfig?.offers[fluenceEnv]?.[offerName]?.id;

        return {
          offerName,
          minPricePerCuPerEpochBigInt,
          effectorPrefixesAndHash,
          effectors,
          computePeersFromProviderConfig,
          offerId,
          minProtocolVersion,
          maxProtocolVersion,
        };
      },
    ),
  );
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

  const providerArtifactsConfig = await initReadonlyProviderArtifactsConfig();

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
): Promise<[T[], (T & { offerIndexerInfo: OfferDetail })[]]> {
  if (offers.length === 0) {
    return [[], []];
  }

  const dealCliClient = await getDealCliClient();

  const getOffersArg: Parameters<typeof dealCliClient.getOffers>[0] = {
    ids: offers.map(({ offerId }) => {
      return offerId;
    }),
  };

  dbg(`Running dealCliClient.getOffers with ${jsonStringify(getOffersArg)}`);
  startSpinner("Fetching offers info from indexer");
  const offersIndexerInfo = await dealCliClient.getOffers(getOffersArg);
  stopSpinner();

  const offersInfoMap = Object.fromEntries(
    offersIndexerInfo.map((o) => {
      return [o.id, o] as const;
    }),
  );

  return splitErrorsAndResults(offers, (offer) => {
    const offerIndexerInfo = offersInfoMap[offer.offerId];

    if (offerIndexerInfo === undefined) {
      return {
        error: offer,
      };
    }

    return {
      result: {
        ...offer,
        offerIndexerInfo,
      },
    };
  });
}
