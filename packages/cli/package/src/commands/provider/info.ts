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

import { yamlDiffPatch } from "yaml-diff-patch";

import { BaseCommand } from "../../baseCommand.js";
import { jsonStringify } from "../../common.js";
import { getProviderInfo } from "../../lib/chain/providerInfo.js";
import { commandObj } from "../../lib/commandObj.js";
import { initNewProviderArtifactsConfig } from "../../lib/configs/project/providerArtifacts/providerArtifacts.js";
import {
  CHAIN_FLAGS,
  JSON_FLAG,
  ADDRESS_FLAG,
  ADDRESS_FLAG_NAME,
  PRIV_KEY_FLAG_NAME,
  PEER_AND_OFFER_NAMES_FLAGS,
} from "../../lib/const.js";
import { aliasesText } from "../../lib/helpers/aliasesText.js";
import { initCli } from "../../lib/lifeCycle.js";
import { resolveComputePeersByNames } from "../../lib/resolveComputePeersByNames.js";
import { ensureFluenceEnv } from "../../lib/resolveFluenceEnv.js";

export default class Info extends BaseCommand<typeof Info> {
  static override hiddenAliases = ["provider:i"];
  static override description = `Print peer signing wallets and peer ids${aliasesText.apply(this)}`;
  static override flags = {
    ...CHAIN_FLAGS,
    ...PEER_AND_OFFER_NAMES_FLAGS,
    ...JSON_FLAG,
    ...ADDRESS_FLAG,
  };

  async run(): Promise<void> {
    const { flags } = await initCli(this, await this.parse(Info));
    const computePeers = await resolveComputePeersByNames({ flags });

    const infoToPrint = {
      ...(await formatProvidersInfo(
        flags[ADDRESS_FLAG_NAME],
        flags[PRIV_KEY_FLAG_NAME],
      )),
      computePeers: computePeers.map(({ name, peerId, walletAddress }) => {
        return {
          peer: name,
          peerId,
          wallet: walletAddress,
        };
      }),
    };

    if (flags.json) {
      commandObj.log(jsonStringify(infoToPrint));
      return;
    }

    commandObj.log(yamlDiffPatch("", {}, infoToPrint));
  }
}

async function formatProvidersInfo(
  addressFromFlags: string | undefined,
  privKeyFromFlags: string | undefined,
) {
  const providerArtifactsConfig = await initNewProviderArtifactsConfig();
  const fluenceEnv = await ensureFluenceEnv();

  const providerAddressesFromArtifacts = Object.values(
    providerArtifactsConfig.offers[fluenceEnv] ?? {},
  ).map(({ providerAddress }) => {
    return providerAddress;
  });

  if (
    providerAddressesFromArtifacts.length === 0 ||
    addressFromFlags !== undefined ||
    privKeyFromFlags !== undefined
  ) {
    const providerInfo = await getProviderInfo(addressFromFlags);

    return {
      providerInfo: formatProviderInfo(providerInfo),
    };
  }

  return {
    providersInfo: await Promise.all(
      providerAddressesFromArtifacts.map(async (address) => {
        const providerInfo = await getProviderInfo(address);
        return [address, formatProviderInfo(providerInfo)] as const;
      }),
    ),
  };
}

function formatProviderInfo(
  providerInfo: Awaited<ReturnType<typeof getProviderInfo>>,
) {
  return {
    ...(providerInfo.name === null
      ? { status: "NotRegistered" }
      : { status: "Registered", name: providerInfo.name }),
    address: providerInfo.address,
  };
}
