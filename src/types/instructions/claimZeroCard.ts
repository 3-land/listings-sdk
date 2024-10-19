import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ClaimZeroCardArgs {
  leafIndex: number
  root: Array<number>
  bumps: Array<number>
  metadata: types.TightCardMetadataFields
}

export interface ClaimZeroCardAccounts {
  storeAccount: PublicKey
  claimer: PublicKey
  packOpenAccountKeep: PublicKey
  packOpenAccountClose: PublicKey
  treeAuthority: PublicKey
  creatorAuthority: PublicKey
  merkleTreeVerifier: PublicKey
  merkleTree: PublicKey
  packAccount: PublicKey
  merkleManager: PublicKey
  /**
   * If there is no collecton authority record PDA then
   * this must be the Bubblegum program address.
   */
  collectionAuthorityRecordPda: PublicKey
  editionAccount: PublicKey
  collectionMetadata: PublicKey
  collectionMint: PublicKey
  bubblegumSigner: PublicKey
  /** CHECK */
  owner: PublicKey
  payer: PublicKey
  logWrapper: PublicKey
  bubblegumProgram: PublicKey
  compressionProgram: PublicKey
  tokenMetadataProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.u32("leafIndex"),
  borsh.array(borsh.u8(), 32, "root"),
  borsh.array(borsh.u8(), 7, "bumps"),
  types.TightCardMetadata.layout("metadata"),
])

export function claimZeroCard(
  args: ClaimZeroCardArgs,
  accounts: ClaimZeroCardAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.claimer, isSigner: false, isWritable: true },
    { pubkey: accounts.packOpenAccountKeep, isSigner: false, isWritable: true },
    {
      pubkey: accounts.packOpenAccountClose,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.treeAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.creatorAuthority, isSigner: false, isWritable: false },
    { pubkey: accounts.merkleTreeVerifier, isSigner: false, isWritable: false },
    { pubkey: accounts.merkleTree, isSigner: false, isWritable: true },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.merkleManager, isSigner: false, isWritable: true },
    {
      pubkey: accounts.collectionAuthorityRecordPda,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.editionAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.collectionMetadata, isSigner: false, isWritable: true },
    { pubkey: accounts.collectionMint, isSigner: false, isWritable: false },
    { pubkey: accounts.bubblegumSigner, isSigner: false, isWritable: false },
    { pubkey: accounts.owner, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
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
  const identifier = Buffer.from([149, 81, 178, 212, 49, 205, 69, 140])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      leafIndex: args.leafIndex,
      root: args.root,
      bumps: args.bumps,
      metadata: types.TightCardMetadata.toEncodable(args.metadata),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
