import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterTraitsArgs {
  traits: Array<string>
}

export interface RegisterTraitsAccounts {
  packAccount: PublicKey
  packTraitsRegistry: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([borsh.vec(borsh.str(), "traits")])

export function registerTraits(
  args: RegisterTraitsArgs,
  accounts: RegisterTraitsAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.packTraitsRegistry, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([74, 33, 255, 80, 173, 251, 200, 233])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      traits: args.traits,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
