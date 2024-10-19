import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface OpenPackArgs {
  root: Array<number>
  dataHash: Array<number>
  creatorHash: Array<number>
  index: number
  randomBase: BN
  creatorAuthorityBump: number
}

export interface OpenPackAccounts {
  treeAuthority: PublicKey
  merkleTree: PublicKey
  packAccount: PublicKey
  packOpenAccount: PublicKey
  creatorAuthority: PublicKey
  packContent: PublicKey
  owner: PublicKey
  packReceipt: PublicKey
  payer: PublicKey
  openAuthority: PublicKey
  bubblegumProgram: PublicKey
  logWrapper: PublicKey
  compressionProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.array(borsh.u8(), 32, "root"),
  borsh.array(borsh.u8(), 32, "dataHash"),
  borsh.array(borsh.u8(), 32, "creatorHash"),
  borsh.u32("index"),
  borsh.u64("randomBase"),
  borsh.u8("creatorAuthorityBump"),
])

export function openPack(
  args: OpenPackArgs,
  accounts: OpenPackAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.treeAuthority, isSigner: false, isWritable: false },
    { pubkey: accounts.merkleTree, isSigner: false, isWritable: true },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.packOpenAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.creatorAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.packContent, isSigner: false, isWritable: true },
    { pubkey: accounts.owner, isSigner: false, isWritable: true },
    { pubkey: accounts.packReceipt, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.openAuthority, isSigner: true, isWritable: true },
    { pubkey: accounts.bubblegumProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.logWrapper, isSigner: false, isWritable: false },
    { pubkey: accounts.compressionProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([75, 203, 144, 65, 63, 253, 103, 85])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      root: args.root,
      dataHash: args.dataHash,
      creatorHash: args.creatorHash,
      index: args.index,
      randomBase: args.randomBase,
      creatorAuthorityBump: args.creatorAuthorityBump,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
