import {
  TransactionInstruction,
  PublicKey,
  AccountMeta,
} from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";

export interface FeedPoolArgs {
  name: string;
  amount: BN;
  decimals: number;
  withdraw: number;
}

export interface FeedPoolAccounts {
  poolVault: PublicKey;
  currency: PublicKey;
  fromAta: PublicKey;
  toAta: PublicKey;
  storeAccount: PublicKey;
  payer: PublicKey;
  tokenProgram: PublicKey;
  systemProgram: PublicKey;
}

export const layout = borsh.struct([
  borsh.str("name"),
  borsh.u64("amount"),
  borsh.u8("decimals"),
  borsh.u8("withdraw"),
]);

export function feedPool(
  args: FeedPoolArgs,
  accounts: FeedPoolAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.poolVault, isSigner: false, isWritable: true },
    { pubkey: accounts.currency, isSigner: false, isWritable: false },
    { pubkey: accounts.fromAta, isSigner: false, isWritable: true },
    { pubkey: accounts.toAta, isSigner: false, isWritable: true },
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([209, 238, 252, 180, 229, 87, 69, 160]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      name: args.name,
      amount: args.amount,
      decimals: args.decimals,
      withdraw: args.withdraw,
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
