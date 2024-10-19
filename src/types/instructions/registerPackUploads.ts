import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterPackUploadsArgs {
  arweave: string | null
}

export interface RegisterPackUploadsAccounts {
  packAccount: PublicKey
  packUploads: PublicKey
  newPackUploads: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([borsh.option(borsh.str(), "arweave")])

export function registerPackUploads(
  args: RegisterPackUploadsArgs,
  accounts: RegisterPackUploadsAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.packAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.packUploads, isSigner: false, isWritable: true },
    { pubkey: accounts.newPackUploads, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([80, 187, 217, 185, 19, 245, 172, 5])
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
