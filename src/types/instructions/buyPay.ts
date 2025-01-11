import {
  TransactionInstruction,
  PublicKey,
  AccountMeta,
} from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";

export interface BuyPayArgs {
  distributionBumps: Array<number>;
}

export interface BuyPayAccounts {
  paymentAccount: PublicKey;
  itemAccount: PublicKey;
  packAccount: PublicKey;
  burnDeposit: PublicKey;
  poolVault: PublicKey;
  holderAccount: PublicKey;
  /** CHECK */
  owner: PublicKey;
  payer: PublicKey;
  systemProgram: PublicKey;
}

export const layout = borsh.struct([
  borsh.array(borsh.u8(), 6, "distributionBumps"),
]);

export function buyPay(
  args: BuyPayArgs,
  accounts: BuyPayAccounts,
  extraAccounts: any[],
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.paymentAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.itemAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.burnDeposit, isSigner: false, isWritable: true },
    { pubkey: accounts.poolVault, isSigner: false, isWritable: true },
    { pubkey: accounts.holderAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.owner, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  for (let item of extraAccounts) {
    keys.push({
      pubkey: item.pubkey,
      isSigner: item.isSigner,
      isWritable: item.isWritable,
    });
  }
  const identifier = Buffer.from([100, 229, 162, 27, 130, 173, 68, 1]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      distributionBumps: args.distributionBumps,
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
