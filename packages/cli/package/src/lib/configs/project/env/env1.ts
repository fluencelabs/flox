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

import type { Deployment } from "@fluencelabs/deal-ts-clients";

import { CHAIN_ENV } from "../../../../common.js";
import { type FluenceEnv, fluenceOldEnvToNewEnv } from "../../../const.js";
import type { ConfigOptions } from "../../initConfigNewTypes.js";

import type { Config as PrevConfig } from "./env0.js";

export type Config = {
  fluenceEnv?: FluenceEnv;
  relays?: Array<string>;
  subgraphUrl?: string;
  rpcUrl?: string;
  blockScoutUrl?: string;
  chainId?: number;
  deployment?: Partial<Deployment>;
  ipfsGateway?: string;
};

export default {
  schema: {
    type: "object",
    properties: {
      fluenceEnv: {
        title: "Fluence environment",
        description: `Fluence environment to connect to`,
        type: "string",
        enum: [...CHAIN_ENV],
        nullable: true,
      },
      relays: {
        type: "array",
        description: `List of custom relay multiaddresses to use when connecting to Fluence network`,
        items: { type: "string" },
        minItems: 1,
        nullable: true,
      },
      subgraphUrl: {
        type: "string",
        description: `Subgraph URL to use`,
        format: "uri",
        nullable: true,
      },
      rpcUrl: {
        type: "string",
        description: `RPC URL to use`,
        format: "uri",
        nullable: true,
      },
      blockScoutUrl: {
        type: "string",
        description: `BlockScout URL to use`,
        format: "uri",
        nullable: true,
      },
      chainId: {
        type: "number",
        description: `Chain ID to use`,
        nullable: true,
      },
      deployment: {
        type: "object",
        description: `Deployed contract address overrides`,
        nullable: true,
        required: [],
        additionalProperties: false,
        properties: {
          usdc: { type: "string", nullable: true },
          multicall3: { type: "string", nullable: true },
          diamond: { type: "string", nullable: true },
          balanceKeeper: { type: "string", nullable: true },
        },
      },
      ipfsGateway: {
        type: "string",
        description: `IPFS gateway URL to use`,
        format: "uri",
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  migrate({ fluenceEnv }) {
    return fluenceEnv === undefined
      ? {}
      : { fluenceEnv: fluenceOldEnvToNewEnv(fluenceEnv) };
  },
} as const satisfies ConfigOptions<PrevConfig, Config>;
