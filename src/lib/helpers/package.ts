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
import { access, mkdir, rename, rm } from "node:fs/promises";
import { join } from "node:path";

import { color } from "@oclif/color";

import { versions } from "../../versions.js";
import { commandObj } from "../commandObj.js";
import { userConfig } from "../configs/globalConfigs.js";
import type {
  FluenceConfig,
  FluenceConfigReadonly,
} from "../configs/project/fluence.js";
import {
  initReadonlyUserConfig,
  type UserConfigReadonly,
} from "../configs/user/config.js";
import {
  CLI_NAME,
  FLUENCE_CONFIG_FILE_NAME,
  fluenceCargoDependencies,
  fluenceNPMDependencies,
  isFluenceCargoDependency,
} from "../const.js";
import {
  ensureUserFluenceCargoDir,
  ensureUserFluenceTmpCargoDir,
} from "../paths.js";

import { isExactVersion } from "./validations.js";

const packageManagers = ["cargo"] as const;
type PackageManager = (typeof packageManagers)[number];

function isDefaultCargoPackage(
  str: string,
): str is keyof (typeof versions)["cargo"] {
  return str in versions.cargo;
}

type ConfigWithDependencies = {
  dependencies?: {
    npm?: Record<string, string>;
    cargo?: Record<string, string>;
  };
};

function getCurrentlyUsedVersion(
  packageManager: PackageManager,
  maybeConfig: ConfigWithDependencies | null,
  name: string,
): string | undefined {
  const versionFromConfig = maybeConfig?.dependencies?.[packageManager]?.[name];

  if (versionFromConfig !== undefined) {
    return versionFromConfig;
  }

  if (isDefaultCargoPackage(name)) {
    return versions.cargo[name];
  }

  return undefined;
}

type UpdateFluenceConfigIfVersionChangedArgs = {
  maybeFluenceConfig: FluenceConfig | null;
  name: string;
  version: string;
  packageManager: PackageManager;
};

const updateFluenceConfigIfVersionChanged = async ({
  fluenceConfig,
  name,
  version,
  packageManager,
}: Omit<UpdateFluenceConfigIfVersionChangedArgs, "maybeFluenceConfig"> & {
  fluenceConfig: FluenceConfig;
}): Promise<void> => {
  const currentlyUsedVersion = getCurrentlyUsedVersion(
    packageManager,
    fluenceConfig,
    name,
  );

  if (version === currentlyUsedVersion) {
    return;
  }

  if (fluenceConfig.dependencies === undefined) {
    fluenceConfig.dependencies = {};
  }

  const dependenciesForPackageManager =
    fluenceConfig.dependencies[packageManager] ?? {};

  dependenciesForPackageManager[name] = version;

  fluenceConfig.dependencies[packageManager] = dependenciesForPackageManager;

  await fluenceConfig.$commit();
};

type UpdateUserConfigIfVersionChangedArgs = {
  name: string;
  version: string;
  packageManager: PackageManager;
};

const updateUserConfigIfVersionChanged = async ({
  name,
  version,
  packageManager,
}: UpdateUserConfigIfVersionChangedArgs): Promise<void> => {
  const currentlyUsedVersion = getCurrentlyUsedVersion(
    packageManager,
    userConfig,
    name,
  );

  if (version === currentlyUsedVersion) {
    return;
  }

  if (userConfig.dependencies === undefined) {
    userConfig.dependencies = {};
  }

  const dependenciesForPackageManager =
    userConfig.dependencies[packageManager] ?? {};

  dependenciesForPackageManager[name] = version;
  userConfig.dependencies[packageManager] = dependenciesForPackageManager;

  await userConfig.$commit();
};

export const updateConfigsIfVersionChanged = async ({
  global,
  maybeFluenceConfig,
  ...restArgs
}: UpdateFluenceConfigIfVersionChangedArgs & {
  global: boolean;
}): Promise<void> => {
  if (global) {
    await updateUserConfigIfVersionChanged(restArgs);
  } else if (maybeFluenceConfig !== null) {
    const fluenceConfig = maybeFluenceConfig;
    await updateFluenceConfigIfVersionChanged({ ...restArgs, fluenceConfig });
  }
};

type ResolveVersionArg = {
  name: string;
  maybeVersion: string | undefined;
  packageManager: PackageManager;
  maybeFluenceConfig: FluenceConfig | null;
};

export const resolveVersionToInstall = async ({
  name,
  maybeVersion,
  packageManager,
  maybeFluenceConfig,
}: ResolveVersionArg): Promise<
  | {
      versionToInstall: string;
    }
  | {
      maybeVersionToCheck: string | undefined;
    }
> => {
  if (typeof maybeVersion === "string") {
    if (!(await isExactVersion(maybeVersion))) {
      return {
        maybeVersionToCheck: maybeVersion,
      };
    }

    return {
      versionToInstall: maybeVersion,
    };
  }

  const maybeRecommendedVersion = (() => {
    if (isFluenceCargoDependency(name)) {
      return versions.cargo[name];
    } else {
      return undefined;
    }
  })();

  const maybeKnownVersion =
    maybeFluenceConfig?.dependencies?.[packageManager]?.[name] ??
    userConfig.dependencies?.[packageManager]?.[name] ??
    maybeRecommendedVersion;

  if (typeof maybeKnownVersion === "string") {
    return {
      versionToInstall: maybeKnownVersion,
    };
  }

  return { maybeVersionToCheck: undefined };
};

const dependenciesPathsGettersMap: Record<
  PackageManager,
  () => [Promise<string>, Promise<string>]
> = {
  cargo: () => {
    return [ensureUserFluenceCargoDir(), ensureUserFluenceTmpCargoDir()];
  },
};

type ResolveDependencyDirPathAndTmpPath = {
  name: string;
  version: string;
  packageManager: PackageManager;
};

export const resolveDependencyDirPathAndTmpPath = async ({
  name,
  version,
  packageManager,
}: ResolveDependencyDirPathAndTmpPath): Promise<{
  dependencyTmpDirPath: string;
  dependencyDirPath: string;
}> => {
  const [depDirPath, depTmpDirPath] = await Promise.all(
    dependenciesPathsGettersMap[packageManager](),
  );

  const dependencyPathEnding = join(...name.split("/"), version);
  return {
    dependencyTmpDirPath: join(depTmpDirPath, dependencyPathEnding),
    dependencyDirPath: join(depDirPath, dependencyPathEnding),
  };
};

type HandleInstallationArg = {
  force: boolean;
  installDependency: () => Promise<void>;
  dependencyDirPath: string;
  dependencyTmpDirPath: string;
  name: string;
  version: string;
  explicitInstallation: boolean;
};

export const handleInstallation = async ({
  force,
  installDependency,
  dependencyDirPath,
  dependencyTmpDirPath,
  explicitInstallation,
  name,
  version,
}: HandleInstallationArg): Promise<void> => {
  const installAndMoveToDependencyPath = async (): Promise<void> => {
    await rm(dependencyTmpDirPath, { recursive: true, force: true });
    await installDependency();
    await rm(dependencyDirPath, { recursive: true, force: true });
    await mkdir(dependencyDirPath, { recursive: true });
    await rename(dependencyTmpDirPath, dependencyDirPath);
  };

  if (force) {
    await installAndMoveToDependencyPath();
  } else {
    try {
      // if dependency is already installed it will be there
      // so there is no need to install
      await access(dependencyDirPath);
    } catch {
      await installAndMoveToDependencyPath();
    }
  }

  if (explicitInstallation) {
    commandObj.log(
      `Successfully installed ${name}@${version} to ${dependencyDirPath}`,
    );
  }
};

export const splitPackageNameAndVersion = (
  packageNameAndMaybeVersion: string,
): [string] | [string, string] => {
  const hasVersion = /.+@.+/.test(packageNameAndMaybeVersion);

  if (!hasVersion) {
    const packageName = packageNameAndMaybeVersion;

    return [packageName];
  }

  const packageNameAndVersionArray = packageNameAndMaybeVersion.split("@");
  const version = packageNameAndVersionArray.pop();
  assert(version !== undefined);
  const packageName = packageNameAndVersionArray.join("@");

  return [packageName, version];
};

export const getRecommendedDependencies = (packageManager: "npm" | "cargo") => {
  const versionsPerPackageManager =
    packageManager === "cargo" ? versions.cargo : versions.npm;

  const defaultDependencies =
    packageManager === "cargo"
      ? fluenceCargoDependencies
      : fluenceNPMDependencies;

  return Object.fromEntries(
    Object.entries(versionsPerPackageManager).filter(([dependencyName]) => {
      return defaultDependencies.some((dep) => {
        return dep === dependencyName;
      });
    }),
  );
};

export const resolveCargoDependencies = async (
  maybeFluenceConfig: FluenceConfigReadonly | null,
  doWarn = false,
) => {
  const recommendedDependencies = getRecommendedDependencies("cargo");
  const userFluenceConfig = await initReadonlyUserConfig();

  const userDependencyOverrides = userFluenceConfig?.dependencies?.cargo ?? {};

  const projectDependencyOverrides =
    maybeFluenceConfig?.dependencies?.cargo ?? {};

  const finalDependencies: Record<string, string> = {
    ...recommendedDependencies,
    ...userDependencyOverrides,
    ...projectDependencyOverrides,
  };

  if (doWarn) {
    warnAboutOverriddenDependencies({
      recommendedDependencies,
      finalDependencies,
      projectDependencyOverrides,
      maybeFluenceConfig,
      userDependencyOverrides,
      userFluenceConfig,
    });
  }

  return finalDependencies;
};

type WarnAboutOverriddenDependenciesArg = {
  recommendedDependencies: Record<string, string>;
  finalDependencies: Record<string, string>;
  projectDependencyOverrides: Record<string, string>;
  maybeFluenceConfig: FluenceConfigReadonly | null;
  userDependencyOverrides: Record<string, string>;
  userFluenceConfig: UserConfigReadonly | null;
};

function warnAboutOverriddenDependencies({
  recommendedDependencies,
  finalDependencies,
  projectDependencyOverrides,
  maybeFluenceConfig,
  userDependencyOverrides,
  userFluenceConfig,
}: WarnAboutOverriddenDependenciesArg) {
  // Warn about overridden recommended dependencies
  Object.entries(recommendedDependencies).forEach(([name, defaultVersion]) => {
    const versionToUse = finalDependencies[name];

    if (versionToUse === defaultVersion || versionToUse === undefined) {
      return;
    }

    if (versionToUse === projectDependencyOverrides[name]) {
      assert(maybeFluenceConfig !== null);

      commandObj.logToStderr(
        color.yellow(
          `Using version ${versionToUse} of ${name} defined at ${maybeFluenceConfig.$getPath()} instead of the recommended version ${defaultVersion}. You can reset it to the recommended version by running \`${CLI_NAME} dep r\``,
        ),
      );

      return;
    }

    if (versionToUse === userDependencyOverrides[name]) {
      assert(userFluenceConfig !== null);

      commandObj.logToStderr(
        color.yellow(
          `Using version ${versionToUse} of ${name} defined at ${userFluenceConfig.$getPath()} instead of the recommended version ${defaultVersion}. You may want to consider adding it to your project's ${FLUENCE_CONFIG_FILE_NAME}. You can reset it to the recommended version by running \`${CLI_NAME} dep r -g\``,
        ),
      );

      return;
    }
  });

  // Warn about using user dependencies from .fluence/config.json
  Object.entries(userDependencyOverrides).forEach(([name, version]) => {
    if (
      finalDependencies[name] === version &&
      projectDependencyOverrides[name] !== version &&
      !(name in recommendedDependencies)
    ) {
      assert(userFluenceConfig !== null);

      commandObj.logToStderr(
        color.yellow(
          `Using version ${version} of ${name} defined at ${userFluenceConfig.$getPath()}, you may want to consider adding it to your project's ${FLUENCE_CONFIG_FILE_NAME}`,
        ),
      );
    }
  });
}
