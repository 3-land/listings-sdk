import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PrintPackArgs {
  proof: types.CurrencyArtistProofFields
  receiptSlot: BN
}

export interface PrintPackAccounts {
  treeAuthority: PublicKey
  creatorAuthority: PublicKey
  discriminator: PublicKey
  packAccount: PublicKey
  merkleTree: PublicKey
  merkleManager: PublicKey
  /**
   * If there is no collecton authority record PDA then
   * this must be the Bubblegum program address.
   */
  collectionAuthorityRecordPda: PublicKey
  packReceipt: PublicKey
  editionAccount: PublicKey
  collectionMetadata: PublicKey
  collectionMint: PublicKey
  storeAccount: PublicKey
  paymentAccount: PublicKey
  buytrackAccount: PublicKey
  bubblegumSigner: PublicKey
  owner: PublicKey
  payer: PublicKey
  logWrapper: PublicKey
  bubblegumProgram: PublicKey
  compressionProgram: PublicKey
  tokenMetadataProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.CurrencyArtistProof.layout("proof"),
  borsh.u64("receiptSlot"),
])

export function printPack(
  args: PrintPackArgs,
  accounts: PrintPackAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.treeAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.creatorAuthority, isSigner: false, isWritable: false },
    { pubkey: accounts.discriminator, isSigner: false, isWritable: false },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.merkleTree, isSigner: false, isWritable: true },
    { pubkey: accounts.merkleManager, isSigner: false, isWritable: true },
    {
      pubkey: accounts.collectionAuthorityRecordPda,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.packReceipt, isSigner: false, isWritable: true },
    { pubkey: accounts.editionAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.collectionMetadata, isSigner: false, isWritable: true },
    { pubkey: accounts.collectionMint, isSigner: false, isWritable: false },
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.paymentAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.buytrackAccount, isSigner: false, isWritable: true },
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
  const identifier = Buffer.from([25, 136, 10, 50, 193, 77, 147, 120])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      proof: types.CurrencyArtistProof.toEncodable(args.proof),
      receiptSlot: args.receiptSlot,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
