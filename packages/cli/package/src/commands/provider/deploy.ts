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

import { BaseCommand } from "../../baseCommand.js";
import { CHAIN_FLAGS, PEER_AND_OFFER_NAMES_FLAGS } from "../../lib/const.js";
import { initCli } from "../../lib/lifeCycle.js";
import { deployManifests } from "../../lib/manifestsDeploy.js";

export default class Deploy extends BaseCommand<typeof Deploy> {
  static override description = "Deploy manifests";
  static override examples = ["<%= config.bin %> <%= command.id %>"];
  static override flags = {
    ...CHAIN_FLAGS,
    ...PEER_AND_OFFER_NAMES_FLAGS,
  };
  async run(): Promise<void> {
    const { flags } = await initCli(this, await this.parse(Deploy));
    await deployManifests({ flags });
  }
}
