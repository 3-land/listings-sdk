import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreateCardArgs {
  supply: number
  index: number
  metadata: types.MetadataArgsFields
}

export interface CreateCardAccounts {
  packAccount: PublicKey
  cardAccount: PublicKey
  creatorAuthority: PublicKey
  packContent: PublicKey
  creator: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.u32("supply"),
  borsh.u16("index"),
  types.MetadataArgs.layout("metadata"),
])

export function createCard(
  args: CreateCardArgs,
  accounts: CreateCardAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.cardAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.creatorAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.packContent, isSigner: false, isWritable: true },
    { pubkey: accounts.creator, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([29, 242, 127, 8, 241, 109, 219, 100])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      supply: args.supply,
      index: args.index,
      metadata: types.MetadataArgs.toEncodable(args.metadata),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
