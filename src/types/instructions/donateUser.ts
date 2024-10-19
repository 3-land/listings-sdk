import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DonateUserArgs {
  epoch: number
  amount: BN
  message: string
  previousRecord: types.PreviousDonationRecordFields | null
}

export interface DonateUserAccounts {
  donationRegistryNew: PublicKey
  donationRegistryOld: PublicKey
  donationRecord: PublicKey
  currency: PublicKey
  receiver: PublicKey
  userActivity: PublicKey
  storeAccount: PublicKey
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
  borsh.u32("epoch"),
  borsh.u64("amount"),
  borsh.str("message"),
  borsh.option(types.PreviousDonationRecord.layout(), "previousRecord"),
])

export function donateUser(
  args: DonateUserArgs,
  accounts: DonateUserAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.donationRegistryNew, isSigner: false, isWritable: true },
    { pubkey: accounts.donationRegistryOld, isSigner: false, isWritable: true },
    { pubkey: accounts.donationRecord, isSigner: false, isWritable: true },
    { pubkey: accounts.currency, isSigner: false, isWritable: false },
    { pubkey: accounts.receiver, isSigner: false, isWritable: true },
    { pubkey: accounts.userActivity, isSigner: false, isWritable: true },
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.merkleTree, isSigner: false, isWritable: true },
    { pubkey: accounts.treeAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.merkleManager, isSigner: false, isWritable: false },
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
  const identifier = Buffer.from([223, 130, 137, 211, 80, 182, 163, 3])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      epoch: args.epoch,
      amount: args.amount,
      message: args.message,
      previousRecord:
        (args.previousRecord &&
          types.PreviousDonationRecord.toEncodable(args.previousRecord)) ||
        null,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
