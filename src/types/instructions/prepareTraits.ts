import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PrepareTraitsAccounts {
  packAccount: PublicKey
  packTraits: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export function prepareTraits(
  accounts: PrepareTraitsAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.packTraits, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([44, 242, 4, 177, 221, 243, 62, 47])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
