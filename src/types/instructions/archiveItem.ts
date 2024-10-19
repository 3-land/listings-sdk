import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ArchiveItemArgs {
  storeBump: number
}

export interface ArchiveItemAccounts {
  storeAccount: PublicKey
  itemAccount: PublicKey
  archiveDeposit: PublicKey
  treeAuthority: PublicKey
  creatorAuthority: PublicKey
  merkleTree: PublicKey
  merkleManager: PublicKey
  owner: PublicKey
  payer: PublicKey
  logWrapper: PublicKey
  bubblegumProgram: PublicKey
  compressionProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([borsh.u8("storeBump")])

export function archiveItem(
  args: ArchiveItemArgs,
  accounts: ArchiveItemAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.itemAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.archiveDeposit, isSigner: false, isWritable: true },
    { pubkey: accounts.treeAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.creatorAuthority, isSigner: false, isWritable: false },
    { pubkey: accounts.merkleTree, isSigner: false, isWritable: true },
    { pubkey: accounts.merkleManager, isSigner: false, isWritable: true },
    { pubkey: accounts.owner, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.logWrapper, isSigner: false, isWritable: false },
    { pubkey: accounts.bubblegumProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.compressionProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([177, 109, 250, 153, 152, 3, 226, 250])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      storeBump: args.storeBump,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
