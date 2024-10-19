import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GatePayArgs {
  index: number
  metadata: types.MetadataArgsFields
}

export interface GatePayAccounts {
  paymentAccount: PublicKey
  itemAccount: PublicKey
  packAccount: PublicKey
  holderAccount: PublicKey
  /** CHECK */
  merkleTree: PublicKey
  /** CHECK */
  owner: PublicKey
  payer: PublicKey
  bubblegumProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.u32("index"),
  types.MetadataArgs.layout("metadata"),
])

export function gatePay(
  args: GatePayArgs,
  accounts: GatePayAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.paymentAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.itemAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.holderAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.merkleTree, isSigner: false, isWritable: false },
    { pubkey: accounts.owner, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.bubblegumProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([10, 221, 234, 101, 181, 180, 75, 191])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      index: args.index,
      metadata: types.MetadataArgs.toEncodable(args.metadata),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
