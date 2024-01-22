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

import { Flags } from "@oclif/core";

import { BaseCommand, baseFlags } from "../../baseCommand.js";
import { createCommitment } from "../../lib/chain/createCommitment.js";
import {
  PRIV_KEY_FLAG,
  NOXES_FLAG,
  PROVIDER_CONFIG_FLAGS,
} from "../../lib/const.js";
import { initCli } from "../../lib/lifeCycle.js";

export default class CreateCommitment extends BaseCommand<
  typeof CreateCommitment
> {
  static override aliases = ["provider:cc"];
  static override description = "Create Capacity commitment";
  static override flags = {
    ...baseFlags,
    ...PRIV_KEY_FLAG,
    ...PROVIDER_CONFIG_FLAGS,
    ...NOXES_FLAG,
    "nox-names": Flags.string({
      description:
        "Comma-separated names of noxes to create capacity commitment for. Default: all noxes from capacityCommitments property of the provider config",
    }),
  };

  async run(): Promise<void> {
    const { flags } = await initCli(this, await this.parse(CreateCommitment));
    await createCommitment(flags);
  }
}