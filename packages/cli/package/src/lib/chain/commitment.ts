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

import assert from "assert";

import type { Contracts } from "@fluencelabs/deal-ts-clients";
import { color } from "@oclif/color";
import parse from "parse-duration";
import { yamlDiffPatch } from "yaml-diff-patch";

import { commandObj } from "../commandObj.js";
import { initProviderConfig } from "../configs/project/provider/provider.js";
import {
  CLI_NAME,
  PEER_NAMES_FLAG_NAME,
  type PeerAndOfferNameFlags,
  CC_IDS_FLAG_NAME,
  FINISH_COMMITMENT_FLAG_NAME,
} from "../const.js";
import { dbg } from "../dbg.js";
import {
  getContracts,
  getEventValues,
  signBatch,
  populateTx,
  sign,
  multicallRead,
  type MulticallReadItem,
} from "../dealClient.js";
import { getCCDetails, getCCIdsByHexPeerIds } from "../gql/gql.js";
import type {
  CapacityCommitmentStatus,
  CcDetailsQuery,
} from "../gql/gqlGenerated.js";
import { secondsToDate } from "../helpers/bigintOps.js";
import { stringifyUnknown } from "../helpers/stringifyUnknown.js";
import { bigintToStr, numToStr } from "../helpers/typesafeStringify.js";
import { splitErrorsAndResults, commaSepStrToArr } from "../helpers/utils.js";
import { input } from "../prompt.js";
import {
  resolveComputePeersByNames,
  type ResolvedComputePeer,
} from "../resolveComputePeersByNames.js";

import {
  peerIdBase58ToUint8Array,
  peerIdBase58ToHexString,
  peerIdHexStringToBase58String,
} from "./conversions.js";
import { fltFormatWithSymbol } from "./currencies.js";

const HUNDRED_PERCENT = 100;

async function getComputePeersWithCCIds(
  computePeers: ResolvedComputePeer[],
): Promise<[Required<CapacityCommitment>, ...Required<CapacityCommitment>[]]> {
  const computePeersWithHexPeerIds = await Promise.all(
    computePeers.map(async (computePeer) => {
      return {
        ...computePeer,
        hexPeerId: await peerIdBase58ToHexString(computePeer.peerId),
      };
    }),
  );

  const { contracts } = await getContracts();

  const [computePeersRPCInfo, ccIdsByHexPeerIdsRes] = await Promise.all([
    multicallRead(
      computePeersWithHexPeerIds.map(({ hexPeerId }): MulticallReadItem => {
        return {
          target: contracts.deployment.diamond,
          callData: contracts.diamond.interface.encodeFunctionData(
            "getComputePeer",
            [hexPeerId],
          ),
          decode(returnData) {
            return contracts.diamond.interface.decodeFunctionResult(
              "getComputePeer",
              returnData,
            );
          },
        };
      }),
    ),
    getCCIdsByHexPeerIds(
      computePeersWithHexPeerIds.map(({ hexPeerId }) => {
        return hexPeerId;
      }),
    ),
  ]);

  const ccIdsByHexPeerIds = Object.fromEntries(
    ccIdsByHexPeerIdsRes.capacityCommitments.map(({ peer, id }) => {
      return [peer.id, id];
    }),
  );

  const { ZeroHash } = await import("ethers");

  const [computePeersWithoutCC, computePeersWithCC] = splitErrorsAndResults(
    computePeersWithHexPeerIds,
    ({ name, peerId, hexPeerId }, i) => {
      const { commitmentId: ccIdFromRPC } =
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        (computePeersRPCInfo[i] as
          | Awaited<ReturnType<Contracts["diamond"]["getComputePeer"]>>
          | undefined) ?? {};

      // if ccIdFromRPC is undefined or ZeroHash (in case CC was removed), then we try to get last ccId from subgraph
      const ccId =
        ccIdFromRPC === undefined || ccIdFromRPC === ZeroHash
          ? ccIdsByHexPeerIds[hexPeerId]
          : ccIdFromRPC;

      return ccId === undefined || ccId === ZeroHash
        ? { error: { name, peerId } }
        : { result: { name, peerId, ccId } satisfies CapacityCommitment };
    },
  );

  if (computePeersWithoutCC.length > 0) {
    commandObj.warn(
      `Some of the commitments were not found for:\n${computePeersWithoutCC
        .map(({ name, peerId }) => {
          return `Peer: ${name}, PeerId: ${peerId}`;
        })
        .join(
          "\n",
        )}\n\nYou can create commitments using '${CLI_NAME} provider cc-create' command.`,
    );
  }

  const [firstComputePeerWithCC, ...restComputePeersWithCC] =
    computePeersWithCC;

  if (firstComputePeerWithCC === undefined) {
    return commandObj.error(
      "No compute peers with capacity commitments were found",
    );
  }

  return [firstComputePeerWithCC, ...restComputePeersWithCC];
}

async function getCCs(
  ccIdsString: string,
): Promise<[CapacityCommitment, ...CapacityCommitment[]]> {
  const ccIds = commaSepStrToArr(ccIdsString);
  const { contracts } = await getContracts();

  const computePeers = await multicallRead(
    ccIds.map((ccId): MulticallReadItem => {
      return {
        target: contracts.deployment.diamond,
        callData: contracts.diamond.interface.encodeFunctionData(
          "getCommitment",
          [ccId],
        ),
        decode(returnData) {
          return contracts.diamond.interface.decodeFunctionResult(
            "getCommitment",
            returnData,
          );
        },
      };
    }),
  );

  const [ccIdsWithoutInfo, ccInfos] = splitErrorsAndResults(
    ccIds,
    (ccId, i) => {
      const { peerId: peerIdHex } =
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        (computePeers[i] as
          | Awaited<ReturnType<Contracts["diamond"]["getCommitment"]>>
          | undefined) ?? {};

      return peerIdHex === undefined
        ? { error: ccId }
        : { result: { peerIdHex, ccId } };
    },
  );

  if (ccIdsWithoutInfo.length > 0) {
    commandObj.warn(
      `Some of the commitments were not found on chain:\n${ccIdsWithoutInfo.join("\n")}`,
    );
  }

  const [firstCCInfo, ...restCCInfos] = await Promise.all(
    ccInfos.map(async ({ ccId, peerIdHex }) => {
      return { ccId, peerId: await peerIdHexStringToBase58String(peerIdHex) };
    }),
  );

  if (firstCCInfo === undefined) {
    return commandObj.error("No commitments were found");
  }

  return [firstCCInfo, ...restCCInfos];
}

export type CCFlags = PeerAndOfferNameFlags & {
  [CC_IDS_FLAG_NAME]?: string | undefined;
};

async function getCommitmentsIds(
  flags: CCFlags,
): Promise<[CapacityCommitment, ...CapacityCommitment[]]> {
  if (flags[CC_IDS_FLAG_NAME] !== undefined) {
    return getCCs(flags[CC_IDS_FLAG_NAME]);
  }

  if (
    flags[PEER_NAMES_FLAG_NAME] === undefined &&
    (await initProviderConfig()) === null
  ) {
    return getCCs(
      await input({
        message: "Enter comma-separated list of Capacity Commitment IDs",
        validate(val: string) {
          return (
            commaSepStrToArr(val).length > 0 ||
            "Please enter at least one commitment id"
          );
        },
      }),
    );
  }

  return getComputePeersWithCCIds(await resolveComputePeersByNames({ flags }));
}

export async function createCommitments(flags: PeerAndOfferNameFlags) {
  const computePeers = await resolveComputePeersByNames({ flags });
  const { contracts } = await getContracts();
  const precision = await contracts.diamond.precision();
  const { ZeroAddress } = await import("ethers");
  const epochDuration = await contracts.diamond.epochDuration();

  const [createCommitmentsTxsErrors, createCommitmentsTxs] =
    splitErrorsAndResults(
      await Promise.all(
        computePeers.map(async ({ peerId, capacityCommitment, name }) => {
          let peerIdUint8Arr;

          try {
            peerIdUint8Arr = await peerIdBase58ToUint8Array(peerId);
          } catch (e) {
            return {
              error: `Invalid peerId: ${peerId}. Error: ${stringifyUnknown(e)}`,
            };
          }

          const durationInSec = BigInt(
            (parse(capacityCommitment.duration) ?? 0) / 1000,
          );

          dbg(
            `initTimestamp: ${bigintToStr(
              await contracts.diamond.initTimestamp(),
            )} Epoch duration: ${bigintToStr(
              epochDuration,
            )}. Current epoch: ${bigintToStr(await contracts.diamond.currentEpoch())}`,
          );

          dbg(`Duration in seconds: ${bigintToStr(durationInSec)}`);
          const durationEpoch = durationInSec / epochDuration;
          dbg(`Duration in epochs: ${bigintToStr(durationEpoch)}`);
          const ccDelegator = capacityCommitment.delegator;

          const minDuration = await contracts.diamond.minDuration();

          if (durationEpoch < minDuration) {
            return {
              error: `Duration for ${color.yellow(
                name,
              )} must be at least ${color.yellow(
                minDuration * epochDuration,
              )} seconds. Got: ${color.yellow(durationInSec)} seconds`,
            };
          }

          const ccStakerReward = Math.floor(
            (capacityCommitment.stakerReward / HUNDRED_PERCENT) *
              Number(precision),
          );

          return {
            result: populateTx(
              contracts.diamond.createCommitment,
              peerIdUint8Arr,
              durationEpoch,
              ccDelegator ?? ZeroAddress,
              ccStakerReward,
            ),
          };
        }),
      ),
      (val) => {
        return val;
      },
    );

  if (createCommitmentsTxsErrors.length > 0) {
    return commandObj.error(
      `Failed to populate transactions to create commitments for some of the compute peers:\n${createCommitmentsTxsErrors.join(
        "\n",
      )}`,
    );
  }

  const [firstCommitmentTx, ...restCommitmentTxs] = createCommitmentsTxs;

  if (firstCommitmentTx === undefined) {
    throw new Error(
      "Unreachable. First commitment tx can't be undefined cause it's checked in resolveComputePeersByNames that computePeers array is not empty",
    );
  }

  let createCommitmentsTxReceipts;

  try {
    createCommitmentsTxReceipts = await signBatch(
      `Create commitments for the following peers:\n\n${computePeers
        .map(({ name, peerId }) => {
          return `Peer: ${name}\nPeerId: ${peerId}`;
        })
        .join("\n\n")}`,
      [firstCommitmentTx, ...restCommitmentTxs],
    );
  } catch (e) {
    const errorString = stringifyUnknown(e);

    if (errorString.includes("Peer doesn't exist")) {
      return commandObj.error(
        `\n\nNot able to find peers on chain. Make sure you used '${CLI_NAME} provider offer-create' command to create offers that contain ALL the peers you selected right now:\n\n${computePeers
          .map(({ name, peerId }) => {
            return `Name: ${name}\nPeerId: ${peerId}`;
          })
          .join("\n\n")}`,
      );
    }

    throw e;
  }

  const commitmentIds = createCommitmentsTxReceipts.flatMap((txReceipt) => {
    return getEventValues({
      txReceipt,
      contract: contracts.diamond,
      eventName: "CommitmentCreated",
      value: "commitmentId",
    });
  });

  const [notStringCommitmentIds, stringCommitmentIds] = splitErrorsAndResults(
    commitmentIds,
    (id) => {
      return typeof id === "string"
        ? { result: id }
        : { error: stringifyUnknown(id) };
    },
  );

  if (notStringCommitmentIds.length > 0) {
    return commandObj.error(
      `Wasn't able to get ids for some of the commitments. Got: ${notStringCommitmentIds.join(
        ", ",
      )}`,
    );
  }

  commandObj.logToStderr(
    `Capacity Commitments were registered with ids:\n${color.yellow(
      stringCommitmentIds.join("\n"),
    )}`,
  );

  commandObj.logToStderr(
    stringifyDetailedCommitmentsInfo(
      await getDetailedCommitmentsInfoGroupedByStatus({
        [PEER_NAMES_FLAG_NAME]: computePeers
          .map(({ name }) => {
            return name;
          })
          .join(", "),
      }),
    ),
  );
}

export async function removeCommitments(flags: CCFlags) {
  const [invalidCommitments, ccWithWaitDelegationStatusGroup] =
    splitErrorsAndResults(await getCommitmentsGroupedByStatus(flags), (cc) => {
      return cc.status === "WaitDelegation" ? { result: cc } : { error: cc };
    });

  if (invalidCommitments.length > 0) {
    commandObj.warn(
      `You can remove commitments only if they have WaitDelegation status. Got:\n\n${basicCCInfoAndStatusToString(invalidCommitments)}`,
    );
  }

  const CCsWithWaitDelegationStatus = ccWithWaitDelegationStatusGroup.flatMap(
    ({ ccInfos }) => {
      return ccInfos;
    },
  );

  const [firstCCWithWaitDelegationStatus, ...restCCsWithWaitDelegationStatus] =
    CCsWithWaitDelegationStatus;

  if (firstCCWithWaitDelegationStatus === undefined) {
    return commandObj.error(
      "No commitments with 'WaitDelegation' status found",
    );
  }

  const { contracts } = await getContracts();

  const CCsWithWaitDelegationStatusString = CCsWithWaitDelegationStatus.map(
    (commitment) => {
      return stringifyBasicCommitmentInfo(commitment);
    },
  ).join("\n\n");

  await signBatch(
    `Remove the following commitments:\n\n${CCsWithWaitDelegationStatusString}`,
    [
      populateTx(
        contracts.diamond.removeCommitment,
        firstCCWithWaitDelegationStatus.ccId,
      ),
      ...restCCsWithWaitDelegationStatus.map(({ ccId }) => {
        return populateTx(contracts.diamond.removeCommitment, ccId);
      }),
    ],
  );

  commandObj.logToStderr(
    `Removed commitments:\n\n${CCsWithWaitDelegationStatusString}`,
  );
}

export async function collateralWithdraw(
  flags: CCFlags & {
    [FINISH_COMMITMENT_FLAG_NAME]?: boolean;
  },
) {
  const { ZeroAddress } = await import("ethers");

  const [invalidCommitments, commitments] = splitErrorsAndResults(
    await getCommitmentsGroupedByStatus(flags),
    (c) => {
      return c.status === "Completed" || c.status === "Failed"
        ? { result: c }
        : { error: c };
    },
  );

  if (invalidCommitments.length > 0) {
    commandObj.warn(
      `You can withdraw collateral only from commitments with "Inactive" or "Failed" status. The following commitments have invalid status:\n\n${basicCCInfoAndStatusToString(
        invalidCommitments,
      )}`,
    );
  }

  if (commitments.length === 0) {
    return commandObj.error(
      "No commitments with 'Inactive' or 'Failed' status found",
    );
  }

  const { contracts } = await getContracts();

  for (const commitment of commitments.flatMap(({ ccInfos }) => {
    return ccInfos;
  })) {
    const { ccId, name: peerName } = commitment;

    // TODO: improve how we get this info
    const [unitIds, isExitedStatuses] =
      await contracts.diamond.getUnitExitStatuses(ccId);

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const computeUnitInfos = (await multicallRead(
      unitIds.map((unitId): MulticallReadItem => {
        return {
          target: contracts.deployment.diamond,
          callData: contracts.diamond.interface.encodeFunctionData(
            "getComputeUnit",
            [unitId],
          ),
          decode(returnData) {
            return contracts.diamond.interface.decodeFunctionResult(
              "getComputeUnit",
              returnData,
            );
          },
        };
      }),
    )) as (
      | Awaited<ReturnType<typeof contracts.diamond.getComputeUnit>>
      | undefined
    )[];

    const units = unitIds.map((unitId, i) => {
      return {
        unitId,
        unitInfo:
          computeUnitInfos[i] ??
          (() => {
            throw new Error(
              `Unreachable. Unit ${unitId} not found after running getComputeUnit`,
            );
          })(),
        isExited:
          isExitedStatuses[i] ??
          (() => {
            throw new Error(
              `Unreachable. No exit status returned from getUnitExitStatuses for unit ${unitId}`,
            );
          })(),
      };
    });

    const unitsWithDeals = units.filter((unit) => {
      return unit.unitInfo.deal !== ZeroAddress;
    });

    const onChainWorkerIds = new Set<string>();

    for (const { unitInfo } of unitsWithDeals) {
      onChainWorkerIds.add(unitInfo.onchainWorkerId);
    }

    const moveResourcesFromDealTxs = Array.from(onChainWorkerIds).map(
      (onchainWorkerId) => {
        return populateTx(
          contracts.diamond.moveResourcesFromDealV2,
          onchainWorkerId,
        );
      },
    );

    const [firstMoveResourcesFromDealTx, ...restMoveResourcesFromDealTxs] =
      moveResourcesFromDealTxs;

    const dealsString = Array.from(
      new Set(
        unitsWithDeals.map(({ unitInfo }) => {
          return unitInfo.deal;
        }),
      ),
    ).join("\n");

    if (firstMoveResourcesFromDealTx !== undefined) {
      try {
        await signBatch(
          `Moving resources from the following deals:\n${dealsString}`,
          [firstMoveResourcesFromDealTx, ...restMoveResourcesFromDealTxs],
        );
      } catch (e) {
        commandObj.warn(
          `Wasn't able to move resources from deals for ${stringifyBasicCommitmentInfo(commitment)}. Most likely the reason is you must wait until the provider exits from all the following deals:\n${dealsString}`,
        );

        dbg(stringifyUnknown(e));
        continue;
      }
    }

    await sign({
      title: `withdraw collateral from: ${ccId}`,
      method: contracts.diamond.withdrawCollateral,
      args: [ccId],
    });

    commandObj.logToStderr(
      `Collateral withdrawn for:\n${stringifyBasicCommitmentInfo(commitment)}`,
    );

    const shouldFinishCommitment = flags[FINISH_COMMITMENT_FLAG_NAME] ?? true; // for provider it's true by default

    if (!shouldFinishCommitment) {
      continue;
    }

    const [firstNotExitedUnit, ...restNotExitedUnits] = units.filter(
      ({ isExited }) => {
        return !isExited;
      },
    );

    await signBatch(
      `${firstNotExitedUnit === undefined ? "Finish" : "Remove compute units from capacity commitments and finish"} commitment ${peerName === undefined ? ccId : `for ${peerName} (${ccId})`} ${ccId}`,
      firstNotExitedUnit === undefined
        ? [populateTx(contracts.diamond.finishCommitment, ccId)]
        : [
            populateTx(contracts.diamond.removeCUFromCC, ccId, [
              firstNotExitedUnit.unitId,
            ]),
            ...restNotExitedUnits.map(({ unitId }) => {
              return populateTx(contracts.diamond.removeCUFromCC, ccId, [
                unitId,
              ]);
            }),
            populateTx(contracts.diamond.finishCommitment, ccId),
          ],
    );
  }
}

export async function collateralRewardWithdraw(flags: CCFlags) {
  const commitments = await getCommitmentsIds(flags);
  const [firstCommitment, ...restCommitments] = commitments;
  const { contracts } = await getContracts();

  await signBatch(
    `Withdraw rewards for commitments:\n\n${commitments
      .map(({ ccId }) => {
        return ccId;
      })
      .join("\n")}`,
    [
      populateTx(contracts.diamond.withdrawReward, firstCommitment.ccId),
      ...restCommitments.map(({ ccId }) => {
        return populateTx(contracts.diamond.withdrawReward, ccId);
      }),
    ],
  );
}

export function stringifyBasicCommitmentInfo({
  name,
  peerId,
  ccId,
}: CapacityCommitment) {
  const peerName = name === undefined ? "" : `Peer: ${name}\n`;
  return `${color.yellow(`${peerName}PeerId: ${peerId}`)}\nCommitmentId: ${ccId}`;
}

type CapacityCommitment = {
  ccId: string;
  peerId: string;
  name?: string;
};

type CommitmentGroupedByStatus = {
  status: CapacityCommitmentStatusString;
  ccInfos: (CapacityCommitment & { status: CapacityCommitmentStatusString })[];
}[];

export async function getCommitmentsGroupedByStatus(
  flags: CCFlags,
): Promise<CommitmentGroupedByStatus> {
  const commitments = await getCommitmentsIds(flags);
  const { contracts } = await getContracts();

  const statuses = await multicallRead(
    commitments.map(({ ccId }): MulticallReadItem => {
      return {
        target: contracts.deployment.diamond,
        callData: contracts.diamond.interface.encodeFunctionData("getStatus", [
          ccId,
        ]),
        decode(returnData) {
          return contracts.diamond.interface.decodeFunctionResult(
            "getStatus",
            returnData,
          );
        },
      };
    }),
  );

  return Array.from(
    commitments
      .reduce<
        Map<
          CapacityCommitmentStatusString,
          (CapacityCommitment & {
            status: CapacityCommitmentStatusString;
          })[]
        >
      >((acc, v, i) => {
        assert(
          typeof statuses[i] === "bigint",
          `Unreachable. Didn't get status for commitment ${v.ccId} from chain`,
        );

        const status = ccStatusToString(statuses[i]);
        const infos = acc.get(status) ?? [];
        infos.push({ ...v, status });
        acc.set(status, infos);
        return acc;
      }, new Map())
      .entries(),
  ).map(([status, ccInfos]) => {
    return { status, ccInfos };
  });
}

function stakerRewardToString(stakerReward: bigint, precision: bigint) {
  return `${numToStr(
    (Number(stakerReward) * HUNDRED_PERCENT) / Number(precision),
  )}%`;
}

function getRewardsMulticallReads(
  commitmentId: string,
  diamondContract: Contracts["diamond"],
  diamondContractAddress: string,
): MulticallReadItem[] {
  return [
    {
      target: diamondContractAddress,
      callData: diamondContract.interface.encodeFunctionData(
        "unlockedRewards",
        [commitmentId],
      ),
      decode(returnData) {
        return diamondContract.interface.decodeFunctionResult(
          "unlockedRewards",
          returnData,
        );
      },
    },
    {
      target: diamondContractAddress,
      callData: diamondContract.interface.encodeFunctionData("totalRewards", [
        commitmentId,
      ]),
      decode(returnData) {
        return diamondContract.interface.decodeFunctionResult(
          "totalRewards",
          returnData,
        );
      },
    },
    {
      target: diamondContractAddress,
      callData: diamondContract.interface.encodeFunctionData("getCommitment", [
        commitmentId,
      ]),
      decode(returnData) {
        return diamondContract.interface.decodeFunctionResult(
          "getCommitment",
          returnData,
        );
      },
    },
  ];
}

export async function getDetailedCommitmentsInfoGroupedByStatus(
  flags: CCFlags,
) {
  const ccGroupedByStatus = await getCommitmentsGroupedByStatus(flags);
  const { contracts } = await getContracts();

  const allCCIds = ccGroupedByStatus.flatMap(({ ccInfos }) => {
    return ccInfos.map(({ ccId }) => {
      return ccId;
    });
  });

  const rewardsMulticallReads = allCCIds.flatMap((id) => {
    return getRewardsMulticallReads(
      id,
      contracts.diamond,
      contracts.deployment.diamond,
    );
  });

  const contractReadsPerCC = rewardsMulticallReads.length / allCCIds.length;

  const [
    [
      currentEpoch,
      epochDuration,
      initTimestamp,
      maxFailedRatio,
      precision,
      ...rewards
    ],
    ccInfosFromSubgraph,
  ] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    multicallRead([
      {
        target: contracts.deployment.diamond,
        callData:
          contracts.diamond.interface.encodeFunctionData("currentEpoch"),
        decode(returnData) {
          return contracts.diamond.interface.decodeFunctionResult(
            "currentEpoch",
            returnData,
          );
        },
      },
      {
        target: contracts.deployment.diamond,
        callData:
          contracts.diamond.interface.encodeFunctionData("epochDuration"),
        decode(returnData) {
          return contracts.diamond.interface.decodeFunctionResult(
            "epochDuration",
            returnData,
          );
        },
      },
      {
        target: contracts.deployment.diamond,
        callData:
          contracts.diamond.interface.encodeFunctionData("initTimestamp"),
        decode(returnData) {
          return contracts.diamond.interface.decodeFunctionResult(
            "initTimestamp",
            returnData,
          );
        },
      },
      {
        target: contracts.deployment.diamond,
        callData:
          contracts.diamond.interface.encodeFunctionData("maxFailedRatio"),
        decode(returnData) {
          return contracts.diamond.interface.decodeFunctionResult(
            "maxFailedRatio",
            returnData,
          );
        },
      },
      {
        target: contracts.deployment.diamond,
        callData: contracts.diamond.interface.encodeFunctionData("precision"),
        decode(returnData) {
          return contracts.diamond.interface.decodeFunctionResult(
            "precision",
            returnData,
          );
        },
      },
      ...ccGroupedByStatus.flatMap(({ ccInfos }) => {
        return ccInfos.flatMap(({ ccId }) => {
          return getRewardsMulticallReads(
            ccId,
            contracts.diamond,
            contracts.deployment.diamond,
          );
        });
      }),
    ]) as Promise<
      [
        Awaited<ReturnType<typeof contracts.diamond.currentEpoch>> | undefined,
        Awaited<ReturnType<typeof contracts.diamond.epochDuration>> | undefined,
        Awaited<ReturnType<typeof contracts.diamond.initTimestamp>> | undefined,
        (
          | Awaited<ReturnType<typeof contracts.diamond.maxFailedRatio>>
          | undefined
        ),
        Awaited<ReturnType<typeof contracts.diamond.precision>> | undefined,
        ...(
          | Awaited<
              ReturnType<
                | typeof contracts.diamond.unlockedRewards
                | typeof contracts.diamond.totalRewards
                | typeof contracts.diamond.getCommitment
              >
            >
          | undefined
        )[],
      ]
    >,
    getCCDetails(allCCIds),
  ]);

  assert(currentEpoch !== undefined, "currentEpoch is undefined");
  assert(epochDuration !== undefined, "epochDuration is undefined");
  assert(initTimestamp !== undefined, "initTimestamp is undefined");
  assert(maxFailedRatio !== undefined, "maxFailedRatio is undefined");
  assert(precision !== undefined, "precision is undefined");

  const commitmentsById = Object.fromEntries(
    ccInfosFromSubgraph.capacityCommitments.map((cc) => {
      return [cc.id, cc];
    }),
  );

  let rewardsCounter = -contractReadsPerCC;
  let infoFromSubgraphCounter = -1;

  return Promise.all(
    ccGroupedByStatus.map(async (groupedCCs) => {
      return {
        statusInfo: groupedCCs,
        CCs: await Promise.all(
          groupedCCs.ccInfos.map(async (cc) => {
            rewardsCounter = rewardsCounter + contractReadsPerCC;
            infoFromSubgraphCounter = infoFromSubgraphCounter + 1;
            const infoFromSubgraph = commitmentsById[cc.ccId];

            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            const unlockedRewards = rewards[rewardsCounter] as
              | Awaited<ReturnType<typeof contracts.diamond.unlockedRewards>>
              | undefined;

            assert(
              unlockedRewards !== undefined,
              "Unreachable. unlockedRewards must be defined",
            );

            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            const totalRewards = rewards[rewardsCounter + 1] as
              | Awaited<ReturnType<typeof contracts.diamond.totalRewards>>
              | undefined;

            assert(
              totalRewards !== undefined,
              "Unreachable. totalRewards must be defined",
            );

            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            const ccFromChain = rewards[rewardsCounter + 2] as
              | Awaited<ReturnType<typeof contracts.diamond.getCommitment>>
              | undefined;

            assert(
              ccFromChain !== undefined,
              "Unreachable. ccFromChain must be defined",
            );

            return getDetailedCommitmentInfo({
              ...cc,
              infoFromSubgraph,
              currentEpoch,
              epochDuration,
              initTimestamp,
              maxFailedRatio,
              precision,
              ccFromChain,
              unlockedRewards,
              totalRewards,
            });
          }),
        ),
      };
    }),
  );
}

export function stringifyDetailedCommitmentsInfo(
  detailedCommitmentsInfoGroupedByStatus: Awaited<
    ReturnType<typeof getDetailedCommitmentsInfoGroupedByStatus>
  >,
) {
  return detailedCommitmentsInfoGroupedByStatus
    .map(({ statusInfo, CCs }) => {
      return `${getStatusHeading(statusInfo)}${CCs.map((cc) => {
        const peerNameString =
          "peerName" in cc ? color.yellow(`Peer: ${cc.peerName}\n`) : "";

        return `${peerNameString}${getDetailedCommitmentInfoString(cc)}`;
      }).join("\n\n")}`;
    })
    .join("\n\n");
}

function getStatusHeading(cc: CommitmentGroupedByStatus[number]) {
  return color.yellow(
    `Status: ${cc.status} (${cc.ccInfos
      .map(({ ccId, name }) => {
        return name ?? ccId;
      })
      .join(",")})\n\n`,
  );
}

async function getDetailedCommitmentInfo({
  infoFromSubgraph: { ccRewardsWithdrawn, dealStakerRewardsWithdrawn } = {},
  ccFromChain,
  status,
  peerId,
  ccId,
  name: peerName,
  currentEpoch,
  epochDuration,
  initTimestamp,
  maxFailedRatio,
  precision,
  totalRewards,
  unlockedRewards,
}: Awaited<
  ReturnType<typeof getCommitmentsGroupedByStatus>
>[number]["ccInfos"][number] & {
  currentEpoch: bigint;
  epochDuration: bigint;
  initTimestamp: bigint;
  maxFailedRatio: bigint;
  precision: bigint;
  totalRewards: Rewards;
  unlockedRewards: Rewards;
  infoFromSubgraph:
    | Partial<CcDetailsQuery["capacityCommitments"][number]>
    | undefined;
  ccFromChain: Awaited<ReturnType<Contracts["diamond"]["getCommitment"]>>;
}) {
  const { calculateTimestamp } = await import(
    "@fluencelabs/deal-ts-clients/dist/dealExplorerClient/utils.js"
  );

  const isCCNotStarted = ccFromChain.startEpoch === 0n;

  function getStartOrExpirationDate(epoch: bigint) {
    return isCCNotStarted
      ? "-"
      : secondsToDate(
          calculateTimestamp(
            Number(epoch),
            Number(initTimestamp),
            Number(epochDuration),
          ),
        ).toLocaleString();
  }

  const totalRewardsSplit = splitRewards(
    totalRewards,
    ccFromChain.rewardDelegatorRate,
    precision,
  );

  const unlockedRewardsSplit = splitRewards(
    unlockedRewards,
    ccFromChain.rewardDelegatorRate,
    precision,
  );

  const withdrawnRewardsSplit =
    ccRewardsWithdrawn !== undefined && dealStakerRewardsWithdrawn !== undefined
      ? splitRewards(
          {
            ccRewards: BigInt(ccRewardsWithdrawn),
            dealStakerRewards: BigInt(dealStakerRewardsWithdrawn),
          },
          ccFromChain.rewardDelegatorRate,
          precision,
        )
      : undefined;

  return {
    ...(peerName === undefined ? {} : { peerName }),
    peerId,
    commitmentId: ccId,
    status,
    staker:
      ccFromChain.delegator === (await import("ethers")).ZeroAddress
        ? "Anyone can activate capacity commitment"
        : ccFromChain.delegator,
    stakerReward: stakerRewardToString(
      ccFromChain.rewardDelegatorRate,
      precision,
    ),
    durationEpochs: bigintToStr(ccFromChain.endEpoch - ccFromChain.startEpoch),
    startEpoch: isCCNotStarted ? "-" : bigintToStr(ccFromChain.startEpoch),
    endEpoch: isCCNotStarted ? "-" : bigintToStr(ccFromChain.endEpoch),
    currentEpoch: bigintToStr(currentEpoch),
    startDate: getStartOrExpirationDate(ccFromChain.startEpoch),
    expirationDate: getStartOrExpirationDate(ccFromChain.endEpoch),
    totalCU: bigintToStr(ccFromChain.unitCount),
    missedProofs: bigintToStr(ccFromChain.totalFailCount),
    threshold: bigintToStr(maxFailedRatio * ccFromChain.unitCount),
    collateralPerUnit: await fltFormatWithSymbol(ccFromChain.collateralPerUnit),
    exitedUnitCount: bigintToStr(ccFromChain.exitedUnitCount),
    totalCCRewardsOverTime: await fltFormatWithSymbol(
      BigInt(totalRewards.ccRewards) + BigInt(totalRewards.dealStakerRewards),
    ),
    providerRewardsInVesting: await fltFormatWithSymbol(
      totalRewardsSplit.provider - unlockedRewardsSplit.provider,
    ),
    providerRewardsAvailable: await fltFormatWithSymbol(
      unlockedRewardsSplit.provider,
    ),
    providerRewardsTotalClaimed:
      withdrawnRewardsSplit === undefined
        ? "Didn't get claimed rewards from indexer"
        : await fltFormatWithSymbol(withdrawnRewardsSplit.provider),
    stakerRewardsInVesting: await fltFormatWithSymbol(
      totalRewardsSplit.staker - unlockedRewardsSplit.staker,
    ),
    stakerRewardsAvailable: await fltFormatWithSymbol(
      unlockedRewardsSplit.staker,
    ),
    stakerRewardsTotalClaimed:
      withdrawnRewardsSplit === undefined
        ? "Didn't get claimed rewards from indexer"
        : await fltFormatWithSymbol(withdrawnRewardsSplit.staker),
  } satisfies Record<string, string>;
}

function getDetailedCommitmentInfoString(
  detailedCommitmentInfo: Awaited<ReturnType<typeof getDetailedCommitmentInfo>>,
) {
  return yamlDiffPatch(
    "",
    {},
    {
      PeerId: detailedCommitmentInfo.peerId,
      "Capacity commitment ID": detailedCommitmentInfo.commitmentId,
      Status: detailedCommitmentInfo.status,
      Staker: detailedCommitmentInfo.staker,
      "Staker reward": detailedCommitmentInfo.stakerReward,
      "Duration (epochs)": detailedCommitmentInfo.durationEpochs,
      "Start / End / Current epoch": [
        detailedCommitmentInfo.startEpoch,
        detailedCommitmentInfo.endEpoch,
        detailedCommitmentInfo.currentEpoch,
      ].join(" / "),
      "Start date": detailedCommitmentInfo.startDate,
      "Expiration date": detailedCommitmentInfo.expirationDate,
      "Total CU": detailedCommitmentInfo.totalCU,
      "Missed proofs / Threshold": [
        detailedCommitmentInfo.missedProofs,
        detailedCommitmentInfo.threshold,
      ].join(" / "),
      "Collateral per unit": detailedCommitmentInfo.collateralPerUnit,
      "Exited unit count": detailedCommitmentInfo.exitedUnitCount,
      "Total CC rewards over time":
        detailedCommitmentInfo.totalCCRewardsOverTime,
      "In vesting / Available / Total claimed (Provider)": [
        detailedCommitmentInfo.providerRewardsInVesting,
        detailedCommitmentInfo.providerRewardsAvailable,
        detailedCommitmentInfo.providerRewardsTotalClaimed,
      ].join(" / "),
      "In vesting / Available / Total claimed (Staker)": [
        detailedCommitmentInfo.stakerRewardsInVesting,
        detailedCommitmentInfo.stakerRewardsAvailable,
        detailedCommitmentInfo.stakerRewardsTotalClaimed,
      ].join(" / "),
    },
  );
}

type Rewards = { ccRewards: bigint; dealStakerRewards: bigint };

function splitRewards(
  { ccRewards, dealStakerRewards }: Rewards,
  stakerRate: bigint,
  precision: bigint,
) {
  const stakerCCReward = (ccRewards * stakerRate) / precision;
  return {
    provider: ccRewards - stakerCCReward,
    staker: stakerCCReward + dealStakerRewards,
  };
}

type CapacityCommitmentStatusString =
  | "Unknown"
  | Exclude<CapacityCommitmentStatus, "Inactive">
  | "Completed";

function ccStatusToString(
  status: Awaited<ReturnType<Contracts["diamond"]["getStatus"]>>,
): CapacityCommitmentStatusString {
  return (
    (
      [
        "Completed",
        "Active",
        "WaitDelegation",
        "WaitStart",
        "Failed",
        "Removed",
      ] as const
    )[Number(status)] ?? "Unknown"
  );
}

export function basicCCInfoAndStatusToString(
  ccsGroupedByStatus: CommitmentGroupedByStatus,
) {
  return ccsGroupedByStatus
    .map((cc) => {
      return `${getStatusHeading(cc)}${cc.ccInfos
        .map((ccInfo) => {
          return stringifyBasicCommitmentInfo(ccInfo);
        })
        .join("\n\n")} `;
    })
    .join("\n\n");
}
