/**
 * Copyright 2023 Fluence Labs Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import assert from "node:assert";

import oclifColor from "@oclif/color";
const color = oclifColor.default;
import { Args } from "@oclif/core";
import { yamlDiffPatch } from "yaml-diff-patch";

import { BaseCommand, baseFlags } from "../../baseCommand.js";
import { commandObj } from "../../lib/commandObj.js";
import { upload } from "../../lib/compiled-aqua/installation-spell/upload.js";
import {
  MIN_WORKERS,
  TARGET_WORKERS,
} from "../../lib/configs/project/fluence.js";
import { initFluenceLockConfig } from "../../lib/configs/project/fluenceLock.js";
import { initNewWorkersConfig } from "../../lib/configs/project/workers.js";
import {
  KEY_PAIR_FLAG,
  PRIV_KEY_FLAG,
  NETWORK_FLAG,
  OFF_AQUA_LOGS_FLAG,
  DEAL_CONFIG,
  FLUENCE_CONFIG_FILE_NAME,
  FLUENCE_CLIENT_FLAGS,
  IMPORT_FLAG,
} from "../../lib/const.js";
import { dealCreate, dealUpdate } from "../../lib/deal.js";
import {
  ensureAquaFileWithWorkerInfo,
  prepareForDeploy,
} from "../../lib/deployWorkers.js";
import { ensureAquaImports } from "../../lib/helpers/aquaImports.js";
import { initFluenceClient } from "../../lib/jsClient.js";
import { initCli } from "../../lib/lifeCycle.js";
import { doRegisterIpfsClient } from "../../lib/localServices/ipfs.js";
import { ensureChainNetwork } from "../../lib/provider.js";

export default class Deploy extends BaseCommand<typeof Deploy> {
  static override description = `Deploy workers according to deal in 'deals' property in ${FLUENCE_CONFIG_FILE_NAME}`;
  static override examples = ["<%= config.bin %> <%= command.id %>"];
  static override flags = {
    ...baseFlags,
    ...KEY_PAIR_FLAG,
    ...OFF_AQUA_LOGS_FLAG,
    ...PRIV_KEY_FLAG,
    ...NETWORK_FLAG,
    ...FLUENCE_CLIENT_FLAGS,
    ...IMPORT_FLAG,
  };
  static override args = {
    "WORKER-NAMES": Args.string({
      description: `Names of workers to deploy (by default all deals from 'deals' property in ${FLUENCE_CONFIG_FILE_NAME} are deployed)`,
    }),
  };
  async run(): Promise<void> {
    const { flags, fluenceConfig, args } = await initCli(
      this,
      await this.parse(Deploy),
      true
    );

    await initFluenceClient(flags, fluenceConfig);
    doRegisterIpfsClient(flags["off-aqua-logs"]);

    const chainNetwork = await ensureChainNetwork({
      maybeNetworkFromFlags: flags.network,
      maybeDealsConfigNetwork: fluenceConfig.chainNetwork,
    });

    const workersConfig = await initNewWorkersConfig();
    const maybeFluenceLockConfig = await initFluenceLockConfig();

    const aquaImports = await ensureAquaImports({
      maybeFluenceConfig: fluenceConfig,
      maybeFluenceLockConfig,
      flags,
    });

    const uploadArg = await prepareForDeploy({
      workerNames: args["WORKER-NAMES"],
      maybeWorkersConfig: workersConfig,
      fluenceConfig,
      maybeFluenceLockConfig,
      aquaImports,
    });

    const uploadResult = await upload(uploadArg);

    const createdDeals: Record<
      string,
      { deal: string; "worker definition": string }
    > = {};

    const updatedDeals: Record<
      string,
      {
        deal: string;
        "old worker definition": string;
        "new worker definition": string;
      }
    > = {};

    for (const {
      name: workerName,
      definition: appCID,
    } of uploadResult.workers) {
      const deal = fluenceConfig?.deals?.[workerName];
      assert(deal !== undefined);
      const { minWorkers = MIN_WORKERS, targetWorkers = TARGET_WORKERS } = deal;

      const maybePreviouslyDeployedDeal = workersConfig.deals?.[workerName];
      const chainNetworkId = DEAL_CONFIG[chainNetwork].chainId;

      if (maybePreviouslyDeployedDeal !== undefined) {
        if (maybePreviouslyDeployedDeal.definition === appCID) {
          commandObj.log(
            `\nWorker ${color.yellow(
              workerName
            )} didn't change. Skipping deal update`
          );

          continue;
        }

        commandObj.log(
          `\nUpdating deal for worker ${color.yellow(workerName)}\n`
        );

        await dealUpdate({
          network: chainNetwork,
          privKey: flags.privKey,
          appCID,
          dealAddress: maybePreviouslyDeployedDeal.dealId,
        });

        updatedDeals[workerName] = {
          deal: getPolygonScanLink(maybePreviouslyDeployedDeal.dealIdOriginal),
          "old worker definition": maybePreviouslyDeployedDeal.definition,
          "new worker definition": appCID,
        };

        if (workersConfig.deals === undefined) {
          workersConfig.deals = {};
        }

        workersConfig.deals[workerName] = {
          timestamp: new Date().toISOString(),
          definition: appCID,
          chainNetwork,
          chainNetworkId: DEAL_CONFIG[chainNetwork].chainId,
          dealIdOriginal: maybePreviouslyDeployedDeal.dealIdOriginal,
          dealId: maybePreviouslyDeployedDeal.dealId,
        };

        await workersConfig.$commit();

        continue;
      }

      commandObj.log(
        `\nCreating deal for worker ${color.yellow(workerName)}\n`
      );

      const dealIdOriginal = await dealCreate({
        chainNetwork,
        privKey: flags.privKey,
        appCID,
        minWorkers,
        targetWorkers,
      });

      if (workersConfig.deals === undefined) {
        workersConfig.deals = {};
      }

      workersConfig.deals[workerName] = {
        definition: appCID,
        timestamp: new Date().toISOString(),
        dealIdOriginal,
        dealId: dealIdOriginal.slice(2).toLowerCase(),
        chainNetwork,
        chainNetworkId,
      };

      await workersConfig.$commit();

      createdDeals[workerName] = {
        deal: getPolygonScanLink(dealIdOriginal),
        "worker definition": appCID,
      };
    }

    await ensureAquaFileWithWorkerInfo(workersConfig);

    const createdDealsText =
      Object.values(createdDeals).length === 0
        ? ""
        : `\n\n${yamlDiffPatch("", {}, { "created deals": createdDeals })}`;

    const updatedDealsText =
      Object.values(updatedDeals).length === 0
        ? ""
        : `\n\n${yamlDiffPatch("", {}, { "updated deals": updatedDeals })}`;

    if (createdDealsText === "" && updatedDealsText === "") {
      return commandObj.log("No updated or created deals");
    }

    commandObj.log(
      `\n\n${color.yellow("Success!")}${createdDealsText}${updatedDealsText}`
    );
  }
}

const getPolygonScanLink = (dealId: string) =>
  `https://mumbai.polygonscan.com/address/${dealId}`;
