import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpgradeItemArgs {
  metadata: types.UpdateMetadataFields
}

export interface UpgradeItemAccounts {
  itemAccount: PublicKey
  packAccount: PublicKey
  storeAccount: PublicKey
  creator: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([types.UpdateMetadata.layout("metadata")])

export function upgradeItem(
  args: UpgradeItemArgs,
  accounts: UpgradeItemAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.itemAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.creator, isSigner: true, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([71, 129, 235, 228, 204, 136, 160, 115])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      metadata: types.UpdateMetadata.toEncodable(args.metadata),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
