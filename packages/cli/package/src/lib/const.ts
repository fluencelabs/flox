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

import { Args, Flags } from "@oclif/core";

import {
  getIsUnion,
  CHAIN_ENV,
  type ChainENV,
  LOCAL_NET_DEFAULT_WALLET_KEY,
} from "../common.js";

import {
  CHAIN_RPC_CONTAINER_NAME,
  CHAIN_RPC_PORT,
} from "./configs/project/chainContainers.js";

export const CLI_NAME = "fluence";
export const CLI_NAME_FULL = "Fluence CLI";
export const NODE_JS_MAJOR_VERSION = 22;
export const FLT_SYMBOL = "FLT";
export const PT_SYMBOL = "USDC";

export const MAX_TOKEN_AMOUNT_KEYWORD = "max";

export const VCPU_PER_CU = 2;
export const DEFAULT_NUMBER_OF_COMPUTE_UNITS_ON_PEER = 1;

export type FluenceEnv = (typeof CHAIN_ENV)[number];
export const isFluenceEnv = getIsUnion(CHAIN_ENV);
export const FLUENCE_ENVS_OLD = ["stage", "dar", "kras", "local"] as const;
export type FluenceEnvOld = (typeof FLUENCE_ENVS_OLD)[number];
export const isFluenceEnvOld = getIsUnion(FLUENCE_ENVS_OLD);

export function fluenceOldEnvToNewEnv(env: FluenceEnvOld): FluenceEnv {
  return (
    {
      stage: "stage",
      dar: "testnet",
      kras: "mainnet",
      local: "local",
    } as const satisfies Record<FluenceEnvOld, FluenceEnv>
  )[env];
}

export const TCP_PORT_START = 977;
export const WEB_SOCKET_PORT_START = 999;
export const HTTP_PORT_START = 918;
export const DEFAULT_AQUAVM_POOL_SIZE = 2;
export const DEFAULT_NUMBER_OF_LOCAL_NET_PEERS = 3;

export const WS_CHAIN_URLS: Record<ChainENV, string> = {
  mainnet: "wss://ws.mainnet.fluence.dev",
  testnet: "wss://ws.testnet.fluence.dev",
  stage: "wss://ws.stage.fluence.dev",
  local: `wss://${CHAIN_RPC_CONTAINER_NAME}:${CHAIN_RPC_PORT}`,
};

export const JSON_EXT = "json";
export const YAML_EXT = "yaml";
export const YML_EXT = "yml";

export const CLI_CONNECTOR_DIR_NAME = "cli-connector";
export const DOT_FLUENCE_DIR_NAME = ".fluence";
export const SCHEMAS_DIR_NAME = "schemas";
export const COUNTLY_DIR_NAME = "countly";
export const SECRETS_DIR_NAME = "secrets";
export const BACKUPS_DIR_NAME = "backups";

export const PROVIDER_CONFIG_FILE_NAME = `provider`;
export const PROVIDER_SECRETS_CONFIG_FILE_NAME = `provider-secrets`;
export const PROVIDER_ARTIFACTS_CONFIG_FILE_NAME = `provider-artifacts`;
export const USER_CONFIG_FILE_NAME = `config`;
export const ENV_CONFIG_FILE_NAME = `env`;
const DOCKER_COMPOSE_FILE_NAME = `docker-compose`;

export const PROVIDER_CONFIG_FULL_FILE_NAME = `${PROVIDER_CONFIG_FILE_NAME}.${YAML_EXT}`;
export const PROVIDER_SECRETS_CONFIG_FULL_FILE_NAME = `${PROVIDER_SECRETS_CONFIG_FILE_NAME}.${YAML_EXT}`;
export const PROVIDER_ARTIFACTS_CONFIG_FULL_FILE_NAME = `${PROVIDER_ARTIFACTS_CONFIG_FILE_NAME}.${YAML_EXT}`;
export const USER_CONFIG_FULL_FILE_NAME = `${USER_CONFIG_FILE_NAME}.${YAML_EXT}`;
export const ENV_CONFIG_FULL_FILE_NAME = `${ENV_CONFIG_FILE_NAME}.${YAML_EXT}`;
export const DOCKER_COMPOSE_FULL_FILE_NAME = `${DOCKER_COMPOSE_FILE_NAME}.${YAML_EXT}`;

export const GITIGNORE_FILE_NAME = ".gitignore";

export const AUTO_GENERATED = "auto-generated";

export const NO_INPUT_FLAG_NAME = "no-input";
export const NO_INPUT_FLAG = {
  [NO_INPUT_FLAG_NAME]: Flags.boolean({
    default: false,
    description: "Don't interactively ask for any input from the user",
  }),
} as const;

const fluenceEnvFlagAndArg = {
  description: "Fluence Environment to use when running the command",
  helpValue: `<${CHAIN_ENV.join(" | ")}>`,
};

export const ENV_FLAG_NAME = "env";

const ENV_FLAG = {
  [ENV_FLAG_NAME]: Flags.string(fluenceEnvFlagAndArg),
};

export const ENV_ARG_NAME = "ENV";
export const ENV_ARG = {
  [ENV_ARG_NAME]: Args.string(fluenceEnvFlagAndArg),
};

export const ALL_FLAG_VALUE = "all";

export const PEER_NAMES_FLAG_NAME = "peer-names";

const PEER_NAMES_FLAG_CONFIG = {
  description: `Comma-separated names of peers from ${PROVIDER_CONFIG_FULL_FILE_NAME}. To use all of your peers: --${PEER_NAMES_FLAG_NAME} ${ALL_FLAG_VALUE}`,
  helpValue: "<peer-1,peer-2>",
};

const PEER_NAMES_FLAG = {
  [PEER_NAMES_FLAG_NAME]: Flags.string(PEER_NAMES_FLAG_CONFIG),
};

export const PEERS_FLAG_NAME = "peers";

export const PEERS_FLAG = {
  [PEERS_FLAG_NAME]: Flags.integer({
    description: `Number of peers to generate when a new ${PROVIDER_CONFIG_FULL_FILE_NAME} is created`,
  }),
};

export const OFFER_FLAG_NAME = "offers";
export const OFFER_IDS_FLAG_NAME = "offer-ids";

const OFFER_FLAG_OBJECT = {
  description: `Comma-separated list of offer names. To use all of your offers: --${OFFER_FLAG_NAME} ${ALL_FLAG_VALUE}`,
  helpValue: "<offer-1,offer-2>",
};

export const OFFER_FLAG = {
  [OFFER_FLAG_NAME]: Flags.string(OFFER_FLAG_OBJECT),
};

export const OFFER_FLAGS = {
  [OFFER_FLAG_NAME]: Flags.string({
    ...OFFER_FLAG_OBJECT,
    exclusive: [OFFER_IDS_FLAG_NAME],
  }),
  [OFFER_IDS_FLAG_NAME]: Flags.string({
    description: `Comma-separated list of offer ids. Can't be used together with --${OFFER_FLAG_NAME} flag`,
    helpValue: "<id-1,id-2>",
    exclusive: [OFFER_FLAG_NAME],
  }),
};

export const PEER_AND_OFFER_NAMES_FLAGS = {
  ...PEER_NAMES_FLAG,
  ...OFFER_FLAG,
};

export type PeerAndOfferNameFlags = {
  [PEER_NAMES_FLAG_NAME]?: string | undefined;
  [OFFER_FLAG_NAME]?: string | undefined;
};

export const PRIV_KEY_FLAG_NAME = "priv-key";

export const PRIV_KEY_FLAG = {
  [PRIV_KEY_FLAG_NAME]: Flags.string({
    description: `!WARNING! for debug purposes only. Passing private keys through flags is unsecure. On local env ${LOCAL_NET_DEFAULT_WALLET_KEY} is used by default when CLI is used in non-interactive mode`,
    helpValue: "<private-key>",
  }),
};

export const ADDRESS_FLAG_NAME = "address";

export const ADDRESS_FLAG = {
  [ADDRESS_FLAG_NAME]: Flags.string({
    description: "Provider address",
    helpValue: "<address>",
  }),
};

export const CHAIN_FLAGS = {
  ...ENV_FLAG,
  ...PRIV_KEY_FLAG,
};

export const DEAL_IDS_FLAG_NAME = "deal-ids";

export const DEAL_IDS_FLAG = {
  [DEAL_IDS_FLAG_NAME]: Flags.string({
    description: `Comma-separated deal ids`,
    helpValue: "<id-1,id-2>",
  }),
};

export const DOCKER_COMPOSE_FLAGS = {
  flags: Flags.string({
    description: "Space separated flags to pass to `docker compose`",
    helpValue: "<--flag arg>",
  }),
};

export const CC_IDS_FLAG_NAME = "cc-ids";

export const CC_FLAGS = {
  [PEER_NAMES_FLAG_NAME]: Flags.string({
    ...PEER_NAMES_FLAG_CONFIG,
    exclusive: [CC_IDS_FLAG_NAME],
  }),
  [CC_IDS_FLAG_NAME]: Flags.string({
    description: "Comma separated capacity commitment IDs",
    exclusive: [PEER_NAMES_FLAG_NAME],
  }),
  ...OFFER_FLAG,
};

export const FINISH_COMMITMENT_FLAG_NAME = "finish";

export const JSON_FLAG = {
  json: Flags.boolean({
    description: "Output JSON",
  }),
};

export const RECOMMENDED_GITIGNORE_CONTENT = `.idea
.DS_Store
/${DOT_FLUENCE_DIR_NAME}/${SECRETS_DIR_NAME}
/${DOT_FLUENCE_DIR_NAME}/${PROVIDER_SECRETS_CONFIG_FULL_FILE_NAME}
/${DOT_FLUENCE_DIR_NAME}/${SCHEMAS_DIR_NAME}
.terraform
.terraform.lock.hcl
`;
export const IS_TTY = Boolean(process.stdout.isTTY && process.stdin.isTTY);
export const IS_DEVELOPMENT = process.env["NODE_ENV"] === "development";

export const DEFAULT_CC_STAKER_REWARD = 20;
export const DEFAULT_CC_DURATION = "100 days";
export const DURATION_EXAMPLE =
  "in human-readable format. Example: 1 months 1 days";
