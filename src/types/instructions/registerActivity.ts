import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterActivityArgs {
  userActivityBump: number
}

export interface RegisterActivityAccounts {
  userActivity: PublicKey
  /** CHECK */
  store: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([borsh.u8("userActivityBump")])

export function registerActivity(
  args: RegisterActivityArgs,
  accounts: RegisterActivityAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.userActivity, isSigner: false, isWritable: true },
    { pubkey: accounts.store, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([79, 208, 220, 62, 162, 88, 1, 134])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      userActivityBump: args.userActivityBump,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
