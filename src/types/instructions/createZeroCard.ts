import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreateZeroCardArgs {
  metadatas: Array<types.ShortMetadataFields>
  bumps: Array<number>
  extras: Array<number>
  config: types.ZeroConfigFields | null
}

export interface CreateZeroCardAccounts {
  packAccount: PublicKey
  packTraits: PublicKey
  merkleTree: PublicKey
  merkleManager: PublicKey
  packContent: PublicKey
  treeAuthority: PublicKey
  logWrapper: PublicKey
  bubblegumProgram: PublicKey
  compressionProgram: PublicKey
  tokenMetadataProgram: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.vec(types.ShortMetadata.layout(), "metadatas"),
  borsh.array(borsh.u8(), 6, "bumps"),
  borsh.array(borsh.u8(), 3, "extras"),
  borsh.option(types.ZeroConfig.layout(), "config"),
])

export function createZeroCard(
  args: CreateZeroCardArgs,
  accounts: CreateZeroCardAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.packTraits, isSigner: false, isWritable: true },
    { pubkey: accounts.merkleTree, isSigner: false, isWritable: true },
    { pubkey: accounts.merkleManager, isSigner: false, isWritable: true },
    { pubkey: accounts.packContent, isSigner: false, isWritable: true },
    { pubkey: accounts.treeAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.logWrapper, isSigner: false, isWritable: false },
    { pubkey: accounts.bubblegumProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.compressionProgram, isSigner: false, isWritable: false },
    {
      pubkey: accounts.tokenMetadataProgram,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([202, 18, 212, 68, 22, 33, 133, 66])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      metadatas: args.metadatas.map((item) =>
        types.ShortMetadata.toEncodable(item)
      ),
      bumps: args.bumps,
      extras: args.extras,
      config:
        (args.config && types.ZeroConfig.toEncodable(args.config)) || null,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
