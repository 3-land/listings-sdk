import {
  TransactionInstruction,
  PublicKey,
  AccountMeta,
} from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";

export interface RegisterCreatorArgs {
  userActivityBump: number;
}

export interface RegisterCreatorAccounts {
  creatorRegistry: PublicKey;
  userActivity: PublicKey;
  itemAccount: PublicKey;
  store: PublicKey;
  payer: PublicKey;
  systemProgram: PublicKey;
}

export const layout = borsh.struct([borsh.u8("userActivityBump")]);

export function registerCreator(
  args: RegisterCreatorArgs,
  accounts: RegisterCreatorAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.creatorRegistry, isSigner: false, isWritable: true },
    { pubkey: accounts.userActivity, isSigner: false, isWritable: true },
    { pubkey: accounts.itemAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.store, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([85, 3, 194, 210, 164, 140, 160, 195]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      userActivityBump: args.userActivityBump,
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
