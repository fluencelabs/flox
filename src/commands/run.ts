/**
 * Copyright 2022 Fluence Labs Limited
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

import { Command, Flags } from "@oclif/core";

import { AquaCLI } from "../lib/aquaCli";
import { getRandomAddr } from "../lib/multiaddr";
import { input } from "../lib/prompt";
import { usage } from "../lib/helpers/usage";

export default class Run extends Command {
  static override description = "Run aqua script";

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  static override flags = {
    on: Flags.string({
      description: "PeerId of the peer where you want to run the function",
      helpValue: "<peer_id>",
    }),
    aqua: Flags.string({
      description:
        "Path to an aqua file or to a directory that contains your aqua files",
      helpValue: "<path>",
    }),
    func: Flags.string({
      char: "f",
      description: "Function call",
      helpValue: "<function-call>",
    }),
    relay: Flags.string({
      description: "Relay node MultiAddress",
      helpValue: "<multiaddr>",
    }),
    timeout: Flags.string({
      description: "Run timeout",
      helpValue: "<milliseconds>",
    }),
  };

  static override usage: string = usage(this);

  async run(): Promise<void> {
    const { flags } = await this.parse(Run);

    const on =
      flags.on ??
      (await input({
        message:
          "Enter a peerId of the peer where you want to run the function",
      }));

    const aqua =
      flags.aqua ??
      (await input({
        message:
          "Enter a path to an aqua file or to a directory that contains your aqua files",
      }));

    const func =
      flags.func ??
      (await input({ message: "Enter a function that you want to run" }));

    const relay = flags.relay ?? getRandomAddr();

    const aquaCli = new AquaCLI(this);

    const result = await aquaCli.run(
      {
        command: "run",
        flags: { addr: relay, func, input: aqua, on, timeout: flags.timeout },
      },
      "Running",
      { function: func, on, relay }
    );

    this.log(result);
  }
}
