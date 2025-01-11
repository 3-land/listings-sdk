import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterSecureArgs {
  arweave: string
}

export interface RegisterSecureAccounts {
  /** CHECK */
  secureHolder: PublicKey
  /** CHECK */
  itemAccount: PublicKey
  storeAccount: PublicKey
  owner: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([borsh.str("arweave")])

export function registerSecure(
  args: RegisterSecureArgs,
  accounts: RegisterSecureAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.secureHolder, isSigner: false, isWritable: true },
    { pubkey: accounts.itemAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.owner, isSigner: true, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([25, 11, 194, 18, 140, 27, 102, 192])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      arweave: args.arweave,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
