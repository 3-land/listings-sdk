import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DeleteCardAccounts {
  packAccount: PublicKey
  packContent: PublicKey
  cardAccount: PublicKey
  manager: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export function deleteCard(
  accounts: DeleteCardAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.packContent, isSigner: false, isWritable: true },
    { pubkey: accounts.cardAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.manager, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([199, 58, 181, 228, 23, 155, 200, 173])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
