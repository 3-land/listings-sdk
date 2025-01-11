import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreatePackArgs {
  metadata: types.MetadataArgsFields
  identifier: BN
  category: Array<number>
  superCategory: Array<number>
  eventCategory: number
  hashTraits: BN
  packConfig: types.PackConfigFields
}

export interface CreatePackAccounts {
  storeAccount: PublicKey
  creatorAuthority: PublicKey
  packTraits: PublicKey
  packAccount: PublicKey
  creator: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.MetadataArgs.layout("metadata"),
  borsh.u64("identifier"),
  borsh.array(borsh.u16(), 3, "category"),
  borsh.array(borsh.u8(), 2, "superCategory"),
  borsh.u16("eventCategory"),
  borsh.u64("hashTraits"),
  types.PackConfig.layout("packConfig"),
])

export function createPack(
  args: CreatePackArgs,
  accounts: CreatePackAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.creatorAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.packTraits, isSigner: false, isWritable: true },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.creator, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([44, 61, 245, 51, 98, 247, 57, 174])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      metadata: types.MetadataArgs.toEncodable(args.metadata),
      identifier: args.identifier,
      category: args.category,
      superCategory: args.superCategory,
      eventCategory: args.eventCategory,
      hashTraits: args.hashTraits,
      packConfig: types.PackConfig.toEncodable(args.packConfig),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
