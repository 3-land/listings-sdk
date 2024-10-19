import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface WithdrawFromStoreAccounts {
  storeAccount: PublicKey
  creator: PublicKey
  systemProgram: PublicKey
}

export function withdrawFromStore(
  accounts: WithdrawFromStoreAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.creator, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([210, 94, 98, 179, 211, 206, 143, 252])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
