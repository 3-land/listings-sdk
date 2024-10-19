import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface AddBurnArgs {
  metadata: types.MetadataArgsFields
  randomBase: number
}

export interface AddBurnAccounts {
  burnProgress: PublicKey
  reserveList: PublicKey
  itemAccount: PublicKey
  packAccount: PublicKey
  /** CHECK */
  owner: PublicKey
  payer: PublicKey
  bubblegumProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.MetadataArgs.layout("metadata"),
  borsh.u32("randomBase"),
])

export function addBurn(
  args: AddBurnArgs,
  accounts: AddBurnAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.burnProgress, isSigner: false, isWritable: true },
    { pubkey: accounts.reserveList, isSigner: false, isWritable: false },
    { pubkey: accounts.itemAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.owner, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.bubblegumProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([183, 93, 81, 201, 185, 34, 138, 89])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      metadata: types.MetadataArgs.toEncodable(args.metadata),
      randomBase: args.randomBase,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
