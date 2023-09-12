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

import assert from "assert";
import { readFile, writeFile } from "fs/promises";
import { join, sep } from "path";

import { color } from "@oclif/color";
import type { JSONSchemaType } from "ajv";
import camelCase from "lodash-es/camelCase.js";
import startCase from "lodash-es/startCase.js";

import { validationErrorToString, ajv } from "../ajvInstance.js";
import { commandObj } from "../commandObj.js";
import { AQUA_EXT, FS_OPTIONS } from "../const.js";
import { input } from "../prompt.js";

import { capitalize } from "./capitilize.js";
import { cleanAquaName, validateAquaName } from "./downloadFile.js";
import { stringifyUnknown } from "./jsonStringify.js";

/**
 * In js object, json or yaml when you want to represent optional value and still generate a type for it you can use this syntax:
 * { $$optional: <someValue>, $$isNil: <boolean> }
 */
const OPTIONAL = "$$optional";
/**
 * When `$$isNil == true`, the value is represented as `nil` in aqua but it will still have type inferred from `$$optional` value.
 */
const IS_NIL = "$$isNil";

type EmptyObject = Record<string, never>;

/**
 * Empty object and empty array are inferred as nil
 * because there is no way to infer a reasonable aqua type from just an empty object or empty array
 */
type NilInAqua = undefined | null | EmptyObject | [];

/**
 * This function is used in order to construct optional syntax in js that is converted to optional values in aqua.
 *
 * @param value - value to be converted. Can be anything.
 * @param valueToInferTypeFrom - a fallback that is used by jsToAqua function to infer the type of the value if value is missing (is null, undefined, empty object or empty array)
 * @returns - js object with special syntax that is converted to optional value in aqua inside jsToAqua function
 *
 * @example
 * const v = makeOptional(1, 1);
 * // v = { $$optional: 1 }
 * @example
 * const v = makeOptional(undefined, 1);
 * // v = { $$optional: 1, $$isNil: true }
 * @example
 * const v = makeOptional(null, 1);
 * // v = { $$optional: 1, $$isNil: true }
 */
export const makeOptional = <T>(
  value: T | NilInAqua,
  valueToInferTypeFrom: T,
): { [OPTIONAL]: T; [IS_NIL]?: boolean } => {
  const optional: { [OPTIONAL]: T; [IS_NIL]?: true } = {
    [OPTIONAL]: isNilInAqua(value) ? valueToInferTypeFrom : value,
  };

  if (isNilInAqua(value)) {
    optional[IS_NIL] = true;
  }

  return optional;
};

const isNilInAqua = <T>(v: T | NilInAqua): v is NilInAqua => {
  return (
    v === undefined ||
    v === null ||
    (typeof v === "object" && Object.keys(v).length === 0) ||
    (Array.isArray(v) && v.length === 0)
  );
};

function dedupeTypeDefs(typeDefs: string): string {
  return [...new Set(typeDefs.split("\n\n"))].join("\n\n");
}

export type JsToAquaArg = {
  valueToConvert: unknown;
  fileName: string;
  useF64ForAllNumbers?: boolean;
  customTypes?: CustomTypes;
};

export const jsToAqua = ({
  valueToConvert,
  fileName,
  useF64ForAllNumbers = false,
  customTypes = [],
}: JsToAquaArg): string => {
  const moduleName = startCase(cleanAquaName(fileName)).split(" ").join("");

  const sortedCustomTypes = customTypes.map(({ name, properties }) => {
    return {
      properties: JSON.stringify(properties.sort()),
      name,
    };
  });

  const { type, value, typeDefs } = jsToAquaImpl({
    fieldName: moduleName,
    nestingLevel: 1,
    currentNesting: "",
    level: "top",
    valueToConvert,
    useF64ForAllNumbers,
    sortedCustomTypes,
  });

  return `aqua ${moduleName} declares *\n\n${
    typeDefs === undefined ? "" : `${dedupeTypeDefs(typeDefs)}\n\n`
  }func get() -> ${type}:\n    <- ${value}\n`;
};

const NIL = { type: "?u8", value: "nil" } as const;

const NUMBER_TYPES = ["u64", "i64", "f64"] as const;

const INDENTATION = "    ";

type JsToAquaImplArg = {
  valueToConvert: unknown;
  fieldName: string;
  currentNesting: string;
  useF64ForAllNumbers: boolean;
  nestingLevel: number;
  sortedCustomTypes: Array<{ name: string; properties: string }>;
  level: "top" | "second" | "rest";
};

export const jsToAquaImpl = ({
  valueToConvert,
  fieldName,
  currentNesting,
  useF64ForAllNumbers,
  nestingLevel,
  sortedCustomTypes,
  level,
}: JsToAquaImplArg): {
  type: string;
  value: string;
  typeDefs?: string | undefined;
} => {
  const error = (message: string) => {
    return commandObj.error(
      `Failed converting to aqua. ${message}. At ${color.yellow(
        currentNesting === "" ? "" : `${currentNesting}.`,
      )}${color.yellow(fieldName)}: ${stringifyUnknown(valueToConvert)}`,
    );
  };

  if (typeof valueToConvert === "string") {
    return { type: "string", value: `"${valueToConvert}"` };
  }

  if (typeof valueToConvert === "number") {
    const isInteger = Number.isInteger(valueToConvert);

    const type = (() => {
      if (useF64ForAllNumbers || !isInteger) {
        return "f64";
      }

      if (valueToConvert < 0) {
        return "i64";
      }

      return "u64";
    })();

    const stringNumber = valueToConvert.toString();

    const value =
      type === "f64" && isInteger ? `${stringNumber}.0` : stringNumber;

    return { type, value };
  }

  if (typeof valueToConvert === "boolean") {
    return { type: "bool", value: valueToConvert.toString() };
  }

  if (isNilInAqua(valueToConvert)) {
    return NIL;
  }

  const newNestingLevel = nestingLevel + 1;
  const prevIndent = INDENTATION.repeat(nestingLevel);
  const newIndent = INDENTATION.repeat(newNestingLevel);

  if (Array.isArray(valueToConvert)) {
    const mappedToAqua = valueToConvert.map((valueToConvert) => {
      return jsToAquaImpl({
        nestingLevel: newNestingLevel,
        valueToConvert,
        fieldName,
        currentNesting,
        useF64ForAllNumbers,
        sortedCustomTypes,
        level: level,
      });
    });

    const firstElementType = mappedToAqua[0]?.type ?? NIL.type;
    const isNumberType = NUMBER_TYPES.includes(firstElementType);

    const type = isNumberType
      ? mappedToAqua.reduce<string>(
          (acc, { type }) => {
            if (!NUMBER_TYPES.includes(type)) {
              return error("All array elements must be of the same type");
            }

            if (acc === "f64" || type === "f64") {
              return "f64";
            }

            if (acc === "i64" || type === "i64") {
              return "i64";
            }

            return "u64";
          },
          useF64ForAllNumbers ? "f64" : "u64",
        )
      : firstElementType;

    const { typeDefs } = mappedToAqua[0] ?? {};

    if (
      !isNumberType &&
      (!mappedToAqua.every((val) => {
        return val.type === type;
      }) ||
        !mappedToAqua.every((val) => {
          return val.typeDefs === typeDefs;
        }))
    ) {
      return error("All array elements must be of the same type");
    }

    return {
      type: `[]${type}`,
      value: `[\n${newIndent}${mappedToAqua
        .map(({ value }) => {
          return value;
        })
        .join(`,\n${newIndent}`)}\n${prevIndent}]`,
      typeDefs,
    };
  }

  if (typeof valueToConvert === "object") {
    assert(
      valueToConvert !== null,
      "we checked v is not null with isNilInAqua",
    );

    const newName = capitalize(camelCase(cleanAquaName(fieldName)));

    if (!/^[A-Z]\w*$/.test(newName)) {
      return error(
        `Name must start with a letter and contain only letters, numbers and underscores. Got: ${color.yellow(
          newName,
        )}`,
      );
    }

    if (level === "second" && newName === currentNesting) {
      return error(
        `Either rename your file so it is not called as your top-level object property ${color.yellow(
          newName,
        )} or pass a custom type name to be used instead`,
      );
    }

    const objectEntries: [string, unknown][] = Object.entries(valueToConvert);
    const objectProperties = JSON.stringify(Object.keys(valueToConvert).sort());

    const { name: nestedType } = sortedCustomTypes.find(({ properties }) => {
      return properties === objectProperties;
    }) ?? {
      name: level === "rest" ? `${currentNesting}${newName}` : newName,
    };

    if (OPTIONAL in valueToConvert) {
      const { type, value, typeDefs } = jsToAquaImpl({
        valueToConvert: valueToConvert[OPTIONAL],
        fieldName,
        currentNesting,
        useF64ForAllNumbers,
        nestingLevel,
        sortedCustomTypes,
        level,
      });

      return {
        type: `?${type}`,
        value:
          IS_NIL in valueToConvert && valueToConvert[IS_NIL] === true
            ? NIL.value
            : `?[${value}]`,
        typeDefs,
      };
    }

    const { keyTypes, keyDataTypes, entries } = objectEntries.reduce<{
      keyTypes: string[];
      keyDataTypes: string[];
      entries: string[];
    }>(
      ({ keyTypes, keyDataTypes, entries }, [fieldName, valueToConvert]) => {
        const { type, value, typeDefs } = jsToAquaImpl({
          currentNesting: nestedType,
          nestingLevel: newNestingLevel,
          level: level === "top" ? "second" : "rest",
          valueToConvert,
          fieldName,
          useF64ForAllNumbers,
          sortedCustomTypes,
        });

        const camelCasedKey = camelCase(cleanAquaName(fieldName));
        const keyValidity = validateAquaName(camelCasedKey);

        if (typeof keyValidity === "string") {
          return error(`Invalid key ${color.yellow(fieldName)} ${keyValidity}`);
        }

        return {
          keyTypes: [...keyTypes, `    ${camelCasedKey}: ${type}`],
          keyDataTypes:
            typeDefs === undefined ? keyDataTypes : [...keyDataTypes, typeDefs],
          entries: [...entries, `\n${newIndent}${camelCasedKey}=${value}`],
        };
      },
      { keyTypes: [], keyDataTypes: [], entries: [] },
    );

    return {
      type: nestedType,
      value: `${nestedType}(${entries.join(",")}\n${INDENTATION.repeat(
        nestingLevel,
      )})`,
      typeDefs: `${
        keyDataTypes.length === 0 ? "" : `${keyDataTypes.join("\n\n")}\n\n`
      }data ${nestedType}:\n${keyTypes.join("\n")}`,
    };
  }

  return error(`Unsupported type: ${typeof valueToConvert}`);
};

export type CustomTypes = Array<{ name: string; properties: Array<string> }>;

const customTypesSchema: JSONSchemaType<CustomTypes> = {
  type: "array",
  items: {
    type: "object",
    properties: {
      name: { type: "string" },
      properties: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["name", "properties"],
  },
};

const customTypesValidator = ajv.compile(customTypesSchema);

export async function fileToAqua(
  inputPathArg: string | undefined,
  outputPathArg: string | undefined,
  useF64ForAllNumbers: boolean,
  customTypesPath: string | undefined,
  parseFn: (content: string) => unknown,
) {
  let customTypes: CustomTypes = [];

  if (customTypesPath !== undefined) {
    const content = await readFile(customTypesPath, FS_OPTIONS);
    const parsedContent = parseFn(content);

    if (!customTypesValidator(parsedContent)) {
      return commandObj.error(
        `Invalid custom types file ${color.yellow(
          customTypesPath,
        )}: ${await validationErrorToString(customTypesValidator.errors)}`,
      );
    }

    customTypes = parsedContent;
  }

  const inputPath =
    inputPathArg ?? (await input({ message: "Enter path to input file" }));

  const content = await readFile(inputPath, FS_OPTIONS);
  const valueToConvert = parseFn(content);

  let outputPath = outputPathArg;

  if (outputPath === undefined) {
    const inputFilePath = inputPath.split(sep);
    const inputFileNameWithExt = inputFilePath.pop();
    const inputPathWithoutFileName = inputFilePath.join(sep);
    assert(inputFileNameWithExt !== undefined);
    const inputFileNameWithExtArr = inputFileNameWithExt.split(".");

    const outputPathWithoutExt =
      inputFileNameWithExtArr.length === 1
        ? inputFileNameWithExtArr[0]
        : inputFileNameWithExtArr.slice(0, -1).join(".");

    assert(outputPathWithoutExt !== undefined);

    outputPath = join(
      inputPathWithoutFileName,
      `${outputPathWithoutExt}.${AQUA_EXT}`,
    );
  }

  const fileNameWithExt = outputPath.split(sep).pop();
  assert(fileNameWithExt !== undefined);
  const fileNameWithExtArr = fileNameWithExt.split(".");
  const ext = fileNameWithExtArr.pop();

  if (ext !== "aqua") {
    commandObj.error("Output file must have .aqua extension");
  }

  const fileName = fileNameWithExtArr.join(".");

  const aqua = jsToAqua({
    valueToConvert,
    fileName,
    useF64ForAllNumbers,
    customTypes,
  });

  await writeFile(outputPath, aqua, FS_OPTIONS);
  commandObj.logToStderr(`Created aqua file at ${color.yellow(outputPath)}`);
}
