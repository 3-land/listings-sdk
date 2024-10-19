import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UnwrapAndDestroyArgs {
  metadata: types.UnwrapMetadataFields
}

export interface UnwrapAndDestroyAccounts {
  itemAccount: PublicKey
  packAccount: PublicKey
  /** CHECK */
  currency: PublicKey
  /** CHECK */
  splVaultFrom: PublicKey
  /** CHECK */
  splVaultTo: PublicKey
  /** CHECK */
  merkleTree: PublicKey
  owner: PublicKey
  tokenProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([types.UnwrapMetadata.layout("metadata")])

export function unwrapAndDestroy(
  args: UnwrapAndDestroyArgs,
  accounts: UnwrapAndDestroyAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.itemAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.currency, isSigner: false, isWritable: false },
    { pubkey: accounts.splVaultFrom, isSigner: false, isWritable: true },
    { pubkey: accounts.splVaultTo, isSigner: false, isWritable: true },
    { pubkey: accounts.merkleTree, isSigner: false, isWritable: false },
    { pubkey: accounts.owner, isSigner: true, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([228, 12, 214, 168, 124, 166, 135, 250])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      metadata: types.UnwrapMetadata.toEncodable(args.metadata),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
