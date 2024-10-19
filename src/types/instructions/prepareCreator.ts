import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PrepareCreatorAccounts {
  storeAccount: PublicKey
  creatorAuthority: PublicKey
  creator: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export function prepareCreator(
  accounts: PrepareCreatorAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.creatorAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.creator, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([6, 217, 148, 231, 102, 186, 94, 73])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
