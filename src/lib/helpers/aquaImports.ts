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

import { access } from "node:fs/promises";

import type { GatherImportsResult } from "@fluencelabs/npm-aqua-compiler";

import type { FluenceConfig } from "../configs/project/fluence.js";
import { builtInAquaDependenciesDirPath } from "../npm.js";
import {
  getFluenceAquaDir,
  ensureFluenceAquaDependenciesPath,
  projectRootDir,
} from "../paths.js";

type GetAquaImportsArg = {
  maybeFluenceConfig: FluenceConfig | null;
  aquaImportsFromFlags?: string[] | undefined;
};

export async function getAquaImports({
  aquaImportsFromFlags,
  maybeFluenceConfig = null,
}: GetAquaImportsArg): Promise<GatherImportsResult> {
  const fluenceAquaDirPath = getFluenceAquaDir();

  const globalImports = [
    ...(aquaImportsFromFlags ?? []),
    ...(maybeFluenceConfig?.aquaImports ?? []),
  ];

  try {
    if (maybeFluenceConfig !== null) {
      await access(fluenceAquaDirPath);
      globalImports.push(fluenceAquaDirPath);
    }
  } catch {}

  const { gatherImportsFromNpm } = await import(
    "@fluencelabs/npm-aqua-compiler"
  );

  return gatherImportsFromNpm({
    npmProjectDirPath:
      maybeFluenceConfig === null
        ? builtInAquaDependenciesDirPath
        : await ensureFluenceAquaDependenciesPath(),
    globalImports,
    aquaToCompileDirPath: projectRootDir,
  });
}
