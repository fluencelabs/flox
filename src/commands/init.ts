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

import path from "node:path";
import fsPromises from "node:fs/promises";

import { Command } from "@oclif/core";
import Ajv, { JSONSchemaType } from "ajv";
import { color } from "@oclif/color";

import {
  CommandObj,
  ARTIFACTS_DIR_NAME,
  EXTENSIONS_JSON_FILE_NAME,
  FLUENCE_DIR_NAME,
  FS_OPTIONS,
  SRC_DIR_NAME,
  VSCODE_DIR_NAME,
  GITIGNORE_FILE_NAME,
  GIT_IGNORE_CONTENT,
} from "../lib/const";
import { getProjectConfig } from "../lib/configs/projectConfig";
import { input } from "../lib/prompt";
import { usage } from "../lib/helpers/usage";

const PROJECT_NAME = "project-name";

export default class Init extends Command {
  static override description =
    "Initialize fluence project in the current directory";

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  // TODO DXJ-31: add "--path" optional flag to set path of the project
  static override args = [{ name: PROJECT_NAME, description: "Project name" }];

  static override usage: string = usage(this);

  async run(): Promise<void> {
    const { args } = await this.parse(Init);
    await init(this, args[PROJECT_NAME]);
  }
}

const validateProjectName = async (name: string): Promise<string | true> => {
  const projectPath = path.join(process.cwd(), name);
  try {
    await fsPromises.access(projectPath);
    return `file or directory '${name}' already exists`;
  } catch {
    return true;
  }
};

const ensureNameIsValid = async (
  name: string,
  commandObj: CommandObj
): Promise<string> => {
  const validOrWarning = await validateProjectName(name);

  if (validOrWarning === true) {
    return name;
  }

  commandObj.warn(validOrWarning);

  const projectName = await input({
    message: "Enter project name:",
    validate: validateProjectName,
  });

  return projectName;
};

const getProjectPath = async (
  name: string | undefined,
  commandObj: CommandObj
): Promise<string> => {
  if (name === undefined) {
    return process.cwd();
  }

  const validName = await ensureNameIsValid(name, commandObj);
  return path.join(process.cwd(), validName);
};

const ajv = new Ajv({ useDefaults: true });

type ExtensionsJson = {
  recommendations: Array<string>;
};

const extensionsJsonSchema: JSONSchemaType<ExtensionsJson> = {
  type: "object",
  properties: {
    recommendations: { type: "array", items: { type: "string" }, default: [] },
  },
  required: ["recommendations"],
};

const validateExtensionsJson = ajv.compile(extensionsJsonSchema);

const YAML_EXTENSION = "redhat.vscode-yaml";

const extensionsConfig: ExtensionsJson = {
  recommendations: [YAML_EXTENSION],
};

const ensureRecommendedExtensions = async (
  projectPath: string
): Promise<void> => {
  const vscodeDirPath = path.join(projectPath, VSCODE_DIR_NAME);
  await fsPromises.mkdir(vscodeDirPath, { recursive: true });
  const extensionsJsonPath = path.join(
    vscodeDirPath,
    EXTENSIONS_JSON_FILE_NAME
  );

  let fileContent: string;
  try {
    fileContent = await fsPromises.readFile(extensionsJsonPath, FS_OPTIONS);
  } catch {
    await fsPromises.writeFile(
      extensionsJsonPath,
      JSON.stringify(extensionsConfig, null, 2),
      FS_OPTIONS
    );
    return;
  }

  let parsedFileContent: unknown;
  try {
    parsedFileContent = JSON.parse(fileContent);
  } catch {
    return;
  }

  if (
    validateExtensionsJson(parsedFileContent) &&
    !parsedFileContent.recommendations.includes(YAML_EXTENSION)
  ) {
    parsedFileContent.recommendations.push(YAML_EXTENSION);
    await fsPromises.writeFile(
      extensionsJsonPath,
      JSON.stringify(parsedFileContent, null, 2),
      FS_OPTIONS
    );
  }
};

const addGitIgnore = async (projectPath: string): Promise<void> => {
  let gitIgnoreContent: string;
  const gitIgnorePath = path.join(projectPath, GITIGNORE_FILE_NAME);
  try {
    const currentGitIgnore = await fsPromises.readFile(
      gitIgnorePath,
      FS_OPTIONS
    );
    const currentGitIgnoreEntries = new Set(currentGitIgnore.split("\n"));
    const missingGitIgnoreEntries = GIT_IGNORE_CONTENT.split("\n")
      .filter((entry): boolean => !currentGitIgnoreEntries.has(entry))
      .join("\n");
    gitIgnoreContent = `${currentGitIgnore}\n${missingGitIgnoreEntries}`;
  } catch {
    gitIgnoreContent = GIT_IGNORE_CONTENT;
  }

  return fsPromises.writeFile(gitIgnorePath, gitIgnoreContent, FS_OPTIONS);
};

export const init = async (
  commandObj: CommandObj,
  projectName?: string
): Promise<string> => {
  const projectPath = await getProjectPath(projectName, commandObj);

  try {
    const srcDirPath = path.join(projectPath, SRC_DIR_NAME);
    await fsPromises.mkdir(srcDirPath, { recursive: true });

    const distDirPath = path.join(projectPath, ARTIFACTS_DIR_NAME);
    await fsPromises.mkdir(distDirPath, { recursive: true });

    const fluenceDirPath = path.join(projectPath, FLUENCE_DIR_NAME);
    await fsPromises.mkdir(fluenceDirPath, { recursive: true });

    await ensureRecommendedExtensions(projectPath);

    await addGitIgnore(projectPath);

    await getProjectConfig(fluenceDirPath);
    commandObj.log(
      color.magentaBright(
        `\nFluence project successfully initialized at ${fluenceDirPath}\n`
      )
    );
    return fluenceDirPath;
  } catch (error) {
    commandObj.error(String(error));
  }
};
