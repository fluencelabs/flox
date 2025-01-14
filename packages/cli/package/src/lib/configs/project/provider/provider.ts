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

import { writeFile } from "fs/promises";
import { join } from "path";

import { color } from "@oclif/color";
import times from "lodash-es/times.js";

import {
  getChainId,
  getIpfsGateway,
  getRpcUrl,
} from "../../../chain/chainConfig.js";
import { hexStringToUTF8ToBase64String } from "../../../chain/conversions.js";
import { commandObj, isInteractive } from "../../../commandObj.js";
import {
  PROVIDER_CONFIG_FULL_FILE_NAME,
  DEFAULT_CC_DURATION,
  DEFAULT_CC_STAKER_REWARD,
  DEFAULT_NUMBER_OF_COMPUTE_UNITS_ON_PEER,
  CLI_NAME,
  DEFAULT_NUMBER_OF_LOCAL_NET_PEERS,
  WS_CHAIN_URLS,
} from "../../../const.js";
import { resolveDeployment } from "../../../dealClient.js";
import { ensureChainEnv } from "../../../ensureChainNetwork.js";
import { type ProviderConfigArgs } from "../../../generateUserProviderConfig.js";
import { getPeerIdFromSecretKey } from "../../../helpers/getPeerIdFromSecretKey.js";
import { numToStr } from "../../../helpers/typesafeStringify.js";
import { pathExists, splitErrorsAndResults } from "../../../helpers/utils.js";
import { genSecretKeyOrReturnExisting } from "../../../keyPairs.js";
import { genManifest } from "../../../manifestsGen.js";
import {
  getProviderConfigPath,
  getFluenceDir,
  ensureFluenceSecretsFilePath,
  ensureK8sManifestsDir,
} from "../../../paths.js";
import { input } from "../../../prompt.js";
import { getConfigInitFunction } from "../../initConfigNew.js";
import { type InitConfigOptions } from "../../initConfigNewTypes.js";
import { initNewEnvConfig } from "../env/env.js";
import { initNewProviderSecretsConfig } from "../providerSecrets/providerSecrets.js";

import configOptions0, { type Config as Config0 } from "./provider0.js";
import configOptions1, { type Config as Config1 } from "./provider1.js";
import configOptions2, { type Config as Config2 } from "./provider2.js";
import configOptions3, { type Config as Config3 } from "./provider3.js";
import configOptions4, {
  resourceNameToId,
  type Config as Config4,
  type ComputePeer,
  getDefaultComputePeerConfig,
  getDefaultResources,
  getDefaultOfferResources,
  type ResourceType,
  mergeCPUResourceDetails,
  mergeRAMResourceDetails,
  mergeStorageResourceDetails,
  getDefaultDataCenterName,
} from "./provider4.js";

export const options: InitConfigOptions<
  Config0,
  Config1,
  Config2,
  Config3,
  Config4
> = {
  description: "Defines provider configuration",
  options: [
    configOptions0,
    configOptions1,
    configOptions2,
    configOptions3,
    configOptions4,
  ],
  getConfigPath: getProviderConfigPath,
  getSchemaDirPath: getFluenceDir,
};

export type ProviderConfig = Awaited<ReturnType<typeof initNewProviderConfig>>;

function getDefault(args: ProviderConfigArgs) {
  return async () => {
    const chainEnv = await ensureChainEnv();
    await initNewEnvConfig(chainEnv);
    const isLocal = chainEnv === "local";

    const numberOfPeers =
      args.peers ??
      (isInteractive && !isLocal
        ? Number(
            await input({
              message: `Enter number of compute peers you want to set up`,
              validate(value) {
                return Number.isInteger(Number(value)) && Number(value) > 0
                  ? true
                  : "Must be a positive integer";
              },
            }),
          )
        : DEFAULT_NUMBER_OF_LOCAL_NET_PEERS);

    const computePeerEntries: [string, ComputePeer][] = [];

    for (const index of times(numberOfPeers)) {
      const name = `peer-${numToStr(index)}`;

      computePeerEntries.push([
        name,
        await getDefaultComputePeerConfig({
          computeUnits: DEFAULT_NUMBER_OF_COMPUTE_UNITS_ON_PEER,
          name,
          index,
        }),
      ] as const);
    }

    const computePeers = Object.fromEntries(computePeerEntries);
    const dataCenterName = await getDefaultDataCenterName();

    return {
      providerName: "defaultProvider",
      resources: await getDefaultResources(),
      computePeers,
      offers: {
        [`${dataCenterName}-Offer`]: {
          dataCenterName,
          computePeers: Object.keys(computePeers),
          resourcePrices: await getDefaultOfferResources(),
        },
      },
      capacityCommitments: Object.fromEntries(
        Object.keys(computePeers).map((peerName) => {
          return [
            peerName,
            {
              duration: DEFAULT_CC_DURATION,
              stakerReward: DEFAULT_CC_STAKER_REWARD,
            },
          ] as const;
        }),
      ),
    };
  };
}

export function initNewProviderConfig(args: ProviderConfigArgs = {}) {
  return getConfigInitFunction(options, getDefault(args))();
}

export const initProviderConfig = getConfigInitFunction(options);

export async function ensureReadonlyProviderConfig() {
  const providerConfig = await initProviderConfig();

  if (providerConfig === null) {
    commandObj.error(
      `Please init ${PROVIDER_CONFIG_FULL_FILE_NAME} using '${CLI_NAME} provider init' in order to continue`,
    );
  }

  return providerConfig;
}

export type EnsureComputerPeerConfig = Awaited<
  ReturnType<typeof ensureComputerPeerConfigs>
>[number];

type EnsureComputerPeerConfigsArgs = {
  computePeerNames?: string[];
  writeManifestFiles?: boolean;
};

export async function ensureComputerPeerConfigs({
  computePeerNames,
  writeManifestFiles = false,
}: EnsureComputerPeerConfigsArgs = {}) {
  const { Wallet } = await import("ethers");
  const providerConfig = await ensureReadonlyProviderConfig();

  const providerSecretsConfig =
    await initNewProviderSecretsConfig(providerConfig);

  const [computePeersWithoutKeys, computePeersWithKeys] = splitErrorsAndResults(
    Object.entries(providerConfig.computePeers)
      .filter(([name]) => {
        return (
          computePeerNames === undefined || computePeerNames.includes(name)
        );
      })
      .map(([computePeerName, computePeer]) => {
        return {
          computePeerName,
          computePeer,
          secretKey: providerSecretsConfig.noxes[computePeerName]?.networkKey,
          signingWallet:
            providerSecretsConfig.noxes[computePeerName]?.signingWallet,
        };
      }),
    ({ secretKey, signingWallet, computePeerName, computePeer }) => {
      return secretKey === undefined || signingWallet === undefined
        ? { error: { computePeerName, computePeer } }
        : {
            result: { secretKey, signingWallet, computePeerName, computePeer },
          };
    },
  );

  if (computePeersWithoutKeys.length > 0) {
    commandObj.warn(
      `Missing keys for the following compute peers at ${providerSecretsConfig.$getPath()}:\n${computePeersWithoutKeys
        .map(({ computePeerName }) => {
          return computePeerName;
        })
        .join(", ")}\nGenerating new ones...`,
    );

    const computePeersWithGeneratedKeys = await Promise.all(
      computePeersWithoutKeys.map(async ({ computePeer, computePeerName }) => {
        return {
          secretKey: (await genSecretKeyOrReturnExisting(computePeerName))
            .secretKey,
          computePeerName,
          computePeer,
          signingWallet: Wallet.createRandom().privateKey,
        };
      }),
    );

    providerSecretsConfig.noxes = {
      ...providerSecretsConfig.noxes,
      ...Object.fromEntries(
        computePeersWithGeneratedKeys.map(
          ({ computePeerName, secretKey, signingWallet }) => {
            return [
              computePeerName,
              { networkKey: secretKey, signingWallet },
            ] as const;
          },
        ),
      ),
    };

    await providerSecretsConfig.$commit();
    computePeersWithKeys.push(...computePeersWithGeneratedKeys);
  }

  const [noCCError, computePeersWithCC] = splitErrorsAndResults(
    computePeersWithKeys,
    (c) => {
      const capacityCommitment =
        providerConfig.capacityCommitments[c.computePeerName];

      return capacityCommitment === undefined
        ? { error: c.computePeerName }
        : { result: { ...c, capacityCommitment } };
    },
  );

  if (noCCError.length > 0) {
    commandObj.error(
      `Missing capacity commitment for compute peers at ${providerConfig.$getPath()}:\n\n${noCCError
        .map((n) => {
          return `capacityCommitments.${n}`;
        })
        .join("\n")}`,
    );
  }

  const env = await ensureChainEnv();
  const k8sManifestsDir = await ensureK8sManifestsDir();
  const { diamond: diamondContract } = await resolveDeployment();
  const networkId = numToStr(await getChainId());
  const ipfsGatewayEndpoint = await getIpfsGateway();
  const wsEndpoint = WS_CHAIN_URLS[env];
  const httpEndpoint = await getRpcUrl();

  return Promise.all(
    computePeersWithCC.map(
      async ({
        computePeerName,
        computePeer,
        secretKey,
        signingWallet,
        capacityCommitment,
      }) => {
        await writeFile(
          await ensureFluenceSecretsFilePath(computePeerName),
          secretKey,
          "utf8",
        );

        const peerId = await getPeerIdFromSecretKey(secretKey);
        const manifestPath = join(k8sManifestsDir, `${computePeerName}.yaml`);

        if (writeManifestFiles || !(await pathExists(manifestPath))) {
          if (!writeManifestFiles) {
            commandObj.warn(
              `Missing a manifest file for the compute peer ${color.yellow(computePeerName)}. Generating a new one at ${manifestPath}`,
            );
          }

          const manifest = genManifest({
            chainPrivateKey: hexStringToUTF8ToBase64String(signingWallet),
            ipSupplies: computePeer.resources.ip.supply,
            httpEndpoint,
            wsEndpoint,
            ipfsGatewayEndpoint,
            peerId,
            networkId,
            diamondContract,
          });

          await writeFile(manifestPath, manifest, "utf8");
        }

        const cpu =
          providerConfig.resources.cpu[computePeer.resources.cpu.name];

        const ram =
          providerConfig.resources.ram[computePeer.resources.ram.name];

        const storages = await Promise.all(
          computePeer.resources.storage.map(async (s) => {
            const storage = providerConfig.resources.storage[s.name];

            return {
              ...s,
              id: await resourceNameToId("storage", s.name),
              details: mergeStorageResourceDetails(storage, s),
            };
          }),
        );

        const resourcesWithIds = {
          cpu: {
            ...computePeer.resources.cpu,
            id: await resourceNameToId("cpu", computePeer.resources.cpu.name),
            details: mergeCPUResourceDetails(cpu, computePeer.resources.cpu),
          },
          ram: {
            ...computePeer.resources.ram,
            id: await resourceNameToId("ram", computePeer.resources.ram.name),
            details: mergeRAMResourceDetails(ram, computePeer.resources.ram),
          },
          storage: storages,
          bandwidth: {
            ...computePeer.resources.bandwidth,
            id: await resourceNameToId(
              "bandwidth",
              computePeer.resources.bandwidth.name,
            ),
          },
          ip: {
            ...computePeer.resources.ip,
            id: await resourceNameToId("ip", computePeer.resources.ip.name),
          },
        } as const satisfies Record<
          ResourceType,
          | { id: string; details?: unknown }
          | Array<{ id: string; details: unknown }>
        >;

        return {
          name: computePeerName,
          secretKey,
          peerId,
          kubeconfigPath: computePeer.kubeconfigPath,
          resourcesWithIds,
          manifestPath,
          walletKey: signingWallet,
          walletAddress: await new Wallet(signingWallet).getAddress(),
          capacityCommitment,
        };
      },
    ),
  );
}
