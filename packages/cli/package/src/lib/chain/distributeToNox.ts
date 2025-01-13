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

import assert from "assert";

import { color } from "@oclif/color";

import { commandObj } from "../commandObj.js";
import {
  FLT_SYMBOL,
  MAX_TOKEN_AMOUNT_KEYWORD,
  type PeerAndOfferNameFlags,
} from "../const.js";
import {
  getWallet,
  sendRawTransaction,
  getSignerAddress,
} from "../dealClient.js";
import { input } from "../prompt.js";
import { resolveComputePeersByNames } from "../resolveComputePeersByNames.js";

import { fltFormatWithSymbol, fltParse } from "./currencies.js";

export async function distributeToPeer(
  flags: { amount?: string | undefined } & PeerAndOfferNameFlags,
) {
  const computePeers = await resolveComputePeersByNames({ flags });

  const amount =
    flags.amount ??
    (await input({
      message: `Enter the amount of ${FLT_SYMBOL} tokens to distribute to peers`,
    }));

  const parsedAmount = await fltParse(amount);
  const formattedAmount = color.yellow(await fltFormatWithSymbol(parsedAmount));

  for (const computePeer of computePeers) {
    const txReceipt = await sendRawTransaction(
      `Distribute ${await fltFormatWithSymbol(parsedAmount)} to ${computePeer.name} (${computePeer.walletAddress})`,
      {
        to: computePeer.walletAddress,
        value: parsedAmount,
      },
    );

    commandObj.logToStderr(
      `Successfully distributed ${formattedAmount} to ${color.yellow(
        computePeer.name,
      )} with tx hash: ${color.yellow(txReceipt.hash)}`,
    );
  }
}

export async function withdrawFromPeer(
  flags: {
    amount?: string | undefined;
  } & PeerAndOfferNameFlags,
) {
  const computePeers = await resolveComputePeersByNames({ flags });

  const amount =
    flags.amount ??
    (await input({
      message: `Enter the amount of ${FLT_SYMBOL} tokens to distribute to peers. Use ${color.yellow(
        MAX_TOKEN_AMOUNT_KEYWORD,
      )} to withdraw maximum possible amount`,
      async validate(val: string) {
        if (val === MAX_TOKEN_AMOUNT_KEYWORD) {
          return true;
        }

        let parsedAmount: bigint;

        try {
          parsedAmount = await fltParse(val);

          if (parsedAmount <= 0n) {
            return "Amount should be greater than 0";
          }

          return true;
        } catch {
          return "Invalid amount";
        }
      },
    }));

  for (const { walletKey: peerWalletKey, name: peerName } of computePeers) {
    const { amountBigInt, txReceipt, peerAddress } =
      amount === MAX_TOKEN_AMOUNT_KEYWORD
        ? await withdrawMaxAmount({
            peerWalletKey,
            peerName,
          })
        : await withdrawSpecificAmount({
            peerWalletKey,
            peerName,
            amountBigInt: await fltParse(amount),
          });

    if (amountBigInt !== undefined) {
      const providerAddress = await getSignerAddress();

      commandObj.logToStderr(
        `Successfully withdrawn ${color.yellow(
          await fltFormatWithSymbol(amountBigInt),
        )} from ${color.yellow(
          peerName,
        )} (${peerAddress}) to ${color.yellow(providerAddress)} with tx hash: ${color.yellow(txReceipt.hash)}\n`,
      );
    }
  }
}

type WithdrawMaxAmountArgs = {
  peerWalletKey: string;
  peerName: string;
};

async function withdrawMaxAmount({
  peerWalletKey,
  peerName,
}: WithdrawMaxAmountArgs) {
  const peerWallet = await getWallet(peerWalletKey);
  const peerAddress = await getSignerAddress();

  const gasLimit = await peerWallet.estimateGas({
    to: peerAddress,
    value: 0n,
  });

  const peerProvider = peerWallet.provider;
  assert(peerProvider !== null, "Unreachable. We ensure provider is not null");
  const gasPrice = await peerProvider.getFeeData();

  if (
    gasPrice.maxFeePerGas === null ||
    gasPrice.maxPriorityFeePerGas === null
  ) {
    return commandObj.error(
      `Wasn't able to get gas price data. Please don't use "${MAX_TOKEN_AMOUNT_KEYWORD}" and specify exact amount of tokens to withdraw instead`,
    );
  }

  const feeAmount =
    (gasPrice.maxFeePerGas + gasPrice.maxPriorityFeePerGas) * gasLimit;

  const totalBalance = await peerProvider.getBalance(peerAddress);
  const amountBigInt = totalBalance - feeAmount;

  if (amountBigInt <= 0n) {
    commandObj.logToStderr(
      `No ${FLT_SYMBOL} tokens to withdraw from ${peerName} (${peerAddress})`,
    );

    return {
      txReceipt: undefined,
      amountBigInt: undefined,
      peerAddress: undefined,
    };
  }

  const providerAddress = await getSignerAddress();

  const result = {
    txReceipt: await sendRawTransaction(
      `Withdraw max amount of ${await fltFormatWithSymbol(amountBigInt)} from ${peerName} (${peerAddress}) to ${providerAddress}`,
      {
        to: providerAddress,
        value: amountBigInt,
        gasLimit,
        maxFeePerGas: gasPrice.maxFeePerGas,
        maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
      },
      peerWallet,
    ),
    amountBigInt,
    peerAddress,
  };

  return result;
}

async function withdrawSpecificAmount({
  peerWalletKey,
  peerName,
  amountBigInt,
}: WithdrawMaxAmountArgs & { amountBigInt: bigint }) {
  const providerAddress = await getSignerAddress();
  const { address: peerAddress } = await getWallet(peerWalletKey);

  return {
    txReceipt: await sendRawTransaction(
      `Withdraw ${await fltFormatWithSymbol(amountBigInt)} from ${peerName} (${peerAddress}) to ${providerAddress}`,
      { to: providerAddress, value: amountBigInt },
    ),
    amountBigInt,
    peerAddress,
  };
}
