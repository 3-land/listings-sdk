import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterCollectorArgs {
  creatorBump: number
  activityBump: number
}

export interface RegisterCollectorAccounts {
  collectorArtistRegistry: PublicKey
  collectorGlobalRegistry: PublicKey
  creatorRegistry: PublicKey
  userActivity: PublicKey
  store: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.u8("creatorBump"),
  borsh.u8("activityBump"),
])

export function registerCollector(
  args: RegisterCollectorArgs,
  accounts: RegisterCollectorAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    {
      pubkey: accounts.collectorArtistRegistry,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.collectorGlobalRegistry,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.creatorRegistry, isSigner: false, isWritable: true },
    { pubkey: accounts.userActivity, isSigner: false, isWritable: true },
    { pubkey: accounts.store, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([105, 124, 61, 206, 8, 95, 112, 16])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      creatorBump: args.creatorBump,
      activityBump: args.activityBump,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
