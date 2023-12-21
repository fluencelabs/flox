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
import parse from "parse-duration";

import type { ContractsENV } from "../const.js";
import { DEFAULT_CC_DURATION } from "../const.js";
import { getProvider } from "../provider.js";

export type ValidationResult = string | true;

export const validateUnique = <T>(
  array: Array<T>,
  getField: (item: T) => string,
  getError: (notUniqueField: string) => string,
): ValidationResult => {
  const set = new Set();

  for (const item of array) {
    const field = getField(item);

    if (set.has(field)) {
      return getError(field);
    }

    set.add(field);
  }

  return true;
};

export const validateHasDefault = <T>(
  array: Array<T>,
  defaultValue: string,
  getField: (item: T) => string,
  errorText: string,
): ValidationResult => {
  return (
    array.some((item): boolean => {
      return getField(item) === defaultValue;
    }) || errorText
  );
};

export const validateBatch = (
  ...args: Array<ValidationResult>
): ValidationResult => {
  const errors = args.filter((result): result is string => {
    return typeof result === "string";
  });

  return errors.length === 0 ? true : errors.join("\n");
};

export const isExactVersion = async (version: string): Promise<boolean> => {
  const semver = await import("semver");
  return semver.clean(version) === version;
};

export const validateAllVersionsAreExact = async (
  versions: Record<string, string>,
): Promise<ValidationResult> => {
  const versionsWithExactness = await Promise.all(
    Object.entries(versions).map(async ([name, version]) => {
      return [name, version, await isExactVersion(version)] as const;
    }),
  );

  const notExactVersions = versionsWithExactness.filter(([, , isExact]) => {
    return !isExact;
  });

  return notExactVersions.length === 0
    ? true
    : `The following dependencies don't have exact versions: ${notExactVersions
        .map(([name, version]) => {
          return `${name}: ${version}`;
        })
        .join(", ")}`;
};

export function validatePositiveNumberOrEmpty(
  input: unknown,
): ValidationResult {
  if (input === "" || Number(input) > 0) {
    return true;
  }

  return "Must be a positive number";
}

export function lessThenValidator(lessThen: number) {
  return function validateLessThen(input: unknown): ValidationResult {
    if (input === "" || Number(input) < lessThen) {
      return true;
    }

    return `Must be less then ${lessThen}`;
  };
}

export function greaterThenValidator(greaterThen: number) {
  return function validateGreaterThen(input: unknown): ValidationResult {
    if (input === "" || Number(input) > greaterThen) {
      return true;
    }

    return `Must be greater then ${greaterThen}`;
  };
}

export function validatePercent(input: unknown): ValidationResult {
  return validateBatch(
    validatePositiveNumberOrEmpty(input),
    lessThenValidator(100)(input),
  );
}

export async function validateAddress(
  input: unknown,
): Promise<ValidationResult> {
  const { ethers } = await import("ethers");

  if (ethers.isAddress(input)) {
    return true;
  }

  return `Must be a valid address. Got: ${color.yellow(String(input))}`;
}

export async function getMinCCDuration(env: ContractsENV): Promise<bigint> {
  const { DealClient } = await import("@fluencelabs/deal-aurora");
  let minDuration: bigint = BigInt((parse(DEFAULT_CC_DURATION) ?? 0) / 1000);

  try {
    const client = new DealClient(getProvider(env), env);
    const core = await client.getCore();
    minDuration = await core.minCCDuration();
  } catch {}

  return minDuration;
}

export async function ccDurationValidator(env: ContractsENV) {
  const minDuration = await getMinCCDuration(env);

  return function validateCCDuration(input: string): ValidationResult {
    const parsed = parse(input);

    if (parsed === undefined) {
      return "Failed to parse duration";
    }

    const parsedSeconds = parsed / 1000;

    if (parsedSeconds < minDuration) {
      return `Must be at least ${minDuration} sec. Got: ${parsedSeconds} sec`;
    }

    return true;
  };
}
