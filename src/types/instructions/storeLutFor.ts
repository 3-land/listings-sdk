import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface StoreLutForArgs {
  forKey: PublicKey
  id: string
}

export interface StoreLutForAccounts {
  lutAccount: PublicKey
  vaultAccount: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([borsh.publicKey("forKey"), borsh.str("id")])

export function storeLutFor(
  args: StoreLutForArgs,
  accounts: StoreLutForAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.lutAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.vaultAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([211, 207, 87, 134, 241, 224, 30, 70])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      forKey: args.forKey,
      id: args.id,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
