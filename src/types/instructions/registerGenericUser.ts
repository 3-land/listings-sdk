import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterGenericUserArgs {
  username: string
  subApp: BN
  subWallet: PublicKey
  category: BN
  lut: PublicKey | null
  genericData: Array<types.GenericStoreFields> | null
  arweave: string | null
  cnft: types.CompactCnftDataFields | null
}

export interface RegisterGenericUserAccounts {
  genericUser: PublicKey
  storeAccount: PublicKey
  profileHolder: PublicKey
  categoryHolder: PublicKey
  oldCategoryHolder: PublicKey
  payer: PublicKey
  merkleTree: PublicKey
  treeAuthority: PublicKey
  merkleManager: PublicKey
  logWrapper: PublicKey
  bubblegumProgram: PublicKey
  compressionProgram: PublicKey
  tokenMetadataProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.str("username"),
  borsh.u64("subApp"),
  borsh.publicKey("subWallet"),
  borsh.u64("category"),
  borsh.option(borsh.publicKey(), "lut"),
  borsh.option(borsh.vec(types.GenericStore.layout()), "genericData"),
  borsh.option(borsh.str(), "arweave"),
  borsh.option(types.CompactCnftData.layout(), "cnft"),
])

export function registerGenericUser(
  args: RegisterGenericUserArgs,
  accounts: RegisterGenericUserAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.genericUser, isSigner: false, isWritable: true },
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.profileHolder, isSigner: false, isWritable: true },
    { pubkey: accounts.categoryHolder, isSigner: false, isWritable: true },
    { pubkey: accounts.oldCategoryHolder, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.merkleTree, isSigner: false, isWritable: true },
    { pubkey: accounts.treeAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.merkleManager, isSigner: false, isWritable: true },
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
  const identifier = Buffer.from([88, 117, 40, 186, 159, 251, 166, 17])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      username: args.username,
      subApp: args.subApp,
      subWallet: args.subWallet,
      category: args.category,
      lut: args.lut,
      genericData:
        (args.genericData &&
          args.genericData.map((item) =>
            types.GenericStore.toEncodable(item)
          )) ||
        null,
      arweave: args.arweave,
      cnft: (args.cnft && types.CompactCnftData.toEncodable(args.cnft)) || null,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
