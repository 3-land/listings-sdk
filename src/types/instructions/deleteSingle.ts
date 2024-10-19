import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DeleteSingleAccounts {
  storeAccount: PublicKey
  itemAccount: PublicKey
  itemReserveList: PublicKey
  archiveDeposit: PublicKey
  creatorRegistry: PublicKey
  manager: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export function deleteSingle(
  accounts: DeleteSingleAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.itemAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.itemReserveList, isSigner: false, isWritable: true },
    { pubkey: accounts.archiveDeposit, isSigner: false, isWritable: true },
    { pubkey: accounts.creatorRegistry, isSigner: false, isWritable: true },
    { pubkey: accounts.manager, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([232, 115, 78, 51, 158, 23, 191, 54])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
