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

import { color } from "@oclif/color";
import { Args } from "@oclif/core";

import { BaseCommand, baseFlags } from "../../baseCommand.js";
import { PRIV_KEY_FLAG, ENV_FLAG } from "../../lib/const.js";
import {
  promptConfirmTx,
  waitTx,
  getDealClient,
} from "../../lib/dealClient.js";
import { initCli } from "../../lib/lifeCycle.js";
import { input } from "../../lib/prompt.js";

export default class RemoveUnit extends BaseCommand<typeof RemoveUnit> {
  static override hidden = true;
  static override description = "Remove unit from the deal";
  static override flags = {
    ...baseFlags,
    ...PRIV_KEY_FLAG,
    ...ENV_FLAG,
  };

  static override args = {
    "UNIT-ID": Args.string({
      description: "Compute unitId",
    }),
  };

  async run(): Promise<void> {
    const { flags, args } = await initCli(this, await this.parse(RemoveUnit));
    const privKey = flags["priv-key"];

    const unitId =
      args["UNIT-ID"] ?? (await input({ message: "Enter compute unit CID" }));

    const { dealClient } = await getDealClient();

    const market = await dealClient.getMarket();

    promptConfirmTx(privKey);
    const tx = await market.returnComputeUnitFromDeal(unitId);

    await waitTx(tx);

    color.green(`Unit ${unitId} was removed from the deal`);
  }
}
