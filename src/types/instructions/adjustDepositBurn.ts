import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface AdjustDepositBurnAccounts {
  burnDeposit: PublicKey
  itemAccount: PublicKey
  packAccount: PublicKey
  /** CHECK */
  owner: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export function adjustDepositBurn(
  accounts: AdjustDepositBurnAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.burnDeposit, isSigner: false, isWritable: true },
    { pubkey: accounts.itemAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.owner, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([14, 147, 177, 8, 228, 194, 77, 173])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
