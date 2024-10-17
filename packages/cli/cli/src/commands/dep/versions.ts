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

import { Flags } from "@oclif/core";

import defaultAquaDependencies from "../../aqua-dependencies/package.json" assert { type: "json" };
import { BaseCommand, baseFlags } from "../../baseCommand.js";
import internalAquaDependencies from "../../cli-aqua-dependencies/package.json" assert { type: "json" };
import { jsonStringify } from "../../common.js";
import { commandObj } from "../../lib/commandObj.js";
import { CLI_NAME_FULL, JSON_FLAG } from "../../lib/const.js";
import { initCli } from "../../lib/lifeCycle.js";
import {
  getRustToolchainToUse,
  getMarineOrMreplVersion,
} from "../../lib/rust.js";
import CLIPackageJSON from "../../versions/cli.package.json" assert { type: "json" };
import JSClientPackageJSON from "../../versions/js-client.package.json" assert { type: "json" };
import { versions } from "../../versions.js";

export default class Versions extends BaseCommand<typeof Versions> {
  static override aliases = ["dep:v"];
  static override description =
    "Get versions of all cli dependencies, including aqua, marine, mrepl and internal";
  static override examples = ["<%= config.bin %> <%= command.id %>"];
  static override flags = {
    ...baseFlags,
    default: Flags.boolean({
      description:
        "Display default npm and cargo dependencies and their versions for current CLI version. Default npm dependencies are always available to be imported in Aqua",
    }),
    ...JSON_FLAG,
  };
  async run(): Promise<void> {
    const { flags, maybeFluenceConfig } = await initCli(
      this,
      await this.parse(Versions),
    );

    const { yamlDiffPatch } = await import("yaml-diff-patch");

    const devDependencies = filterOutNonFluenceDependencies(
      CLIPackageJSON.devDependencies,
    );

    const defaultDeps = {
      [`${CLI_NAME_FULL} version`]: commandObj.config.version,
      "internal aqua dependencies": internalAquaDependencies.dependencies,
      "nox version": versions["nox"],
      "internal dependencies": filterOutNonFluenceDependencies(
        CLIPackageJSON.dependencies,
      ),
      ...(Object.keys(devDependencies).length === 0
        ? {}
        : {
            "internal dev dependencies": filterOutNonFluenceDependencies(
              CLIPackageJSON.devDependencies,
            ),
          }),
      "js-client dependencies": filterOutNonFluenceDependencies(
        JSClientPackageJSON.dependencies,
      ),
      [RUST_TOOLCHAIN]: versions["rust-toolchain"],
      [AQUA_DEPENDENCIES]: defaultAquaDependencies.dependencies,
      [TOOLS]: {
        [MARINE]: versions.cargo.marine,
        [MREPL]: versions.cargo.mrepl,
      },
    };

    if (flags.default) {
      commandObj.log(
        flags.json
          ? jsonStringify(defaultDeps)
          : yamlDiffPatch("", {}, defaultDeps),
      );

      return;
    }

    const deps = {
      ...defaultDeps,
      [RUST_TOOLCHAIN]: await getRustToolchainToUse(),
      [AQUA_DEPENDENCIES]:
        maybeFluenceConfig === null
          ? defaultAquaDependencies.dependencies
          : maybeFluenceConfig.aquaDependencies,
      [TOOLS]: {
        [MARINE]: await getMarineOrMreplVersion("marine"),
        [MREPL]: await getMarineOrMreplVersion("mrepl"),
      },
    };

    commandObj.log(
      flags.json ? jsonStringify(deps) : yamlDiffPatch("", {}, deps),
    );
  }
}

const RUST_TOOLCHAIN = "rust-toolchain";
const AQUA_DEPENDENCIES = "aqua-dependencies";
const TOOLS = "tools";
const MARINE = "marine";
const MREPL = "mrepl";

const filterOutNonFluenceDependencies = (
  dependencies: Record<string, string>,
) => {
  return Object.fromEntries(
    Object.entries(dependencies).filter(([dep]) => {
      return dep.startsWith("@fluencelabs/");
    }),
  );
};
