import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpgradeAssetArgs {
  changing: types.ChangingMetadataFields
  index: number
  root: Array<number>
}

export interface UpgradeAssetAccounts {
  itemAccount: PublicKey
  packAccount: PublicKey
  merkleManager: PublicKey
  storeAccount: PublicKey
  creatorAuthority: PublicKey
  /** CHECK */
  merkleTree: PublicKey
  /** CHECK */
  owner: PublicKey
  creator: PublicKey
  treeAuthority: PublicKey
  /**
   * If there is no collecton authority record PDA then
   * this must be the Bubblegum program address.
   */
  collectionAuthorityRecordPda: PublicKey
  collectionMetadata: PublicKey
  collectionMint: PublicKey
  logWrapper: PublicKey
  bubblegumProgram: PublicKey
  compressionProgram: PublicKey
  tokenMetadataProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.ChangingMetadata.layout("changing"),
  borsh.u32("index"),
  borsh.array(borsh.u8(), 32, "root"),
])

export function upgradeAsset(
  args: UpgradeAssetArgs,
  accounts: UpgradeAssetAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.itemAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.merkleManager, isSigner: false, isWritable: true },
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.creatorAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.merkleTree, isSigner: false, isWritable: true },
    { pubkey: accounts.owner, isSigner: false, isWritable: false },
    { pubkey: accounts.creator, isSigner: true, isWritable: false },
    { pubkey: accounts.treeAuthority, isSigner: false, isWritable: true },
    {
      pubkey: accounts.collectionAuthorityRecordPda,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.collectionMetadata, isSigner: false, isWritable: true },
    { pubkey: accounts.collectionMint, isSigner: false, isWritable: false },
    { pubkey: accounts.logWrapper, isSigner: false, isWritable: false },
    { pubkey: accounts.bubblegumProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.compressionProgram, isSigner: false, isWritable: false },
    {
      pubkey: accounts.tokenMetadataProgram,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([25, 63, 30, 124, 237, 209, 225, 141])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      changing: types.ChangingMetadata.toEncodable(args.changing),
      index: args.index,
      root: args.root,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
