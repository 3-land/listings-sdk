import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface BurnPayArgs {
  metadata: types.MetadataArgsFields | null
}

export interface BurnPayAccounts {
  paymentAccount: PublicKey
  itemAccount: PublicKey
  packAccount: PublicKey
  holderAccount: PublicKey
  /** CHECK */
  owner: PublicKey
  payer: PublicKey
  bubblegumProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.option(types.MetadataArgs.layout(), "metadata"),
])

export function burnPay(
  args: BurnPayArgs,
  accounts: BurnPayAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.paymentAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.itemAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.holderAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.owner, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.bubblegumProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([214, 127, 55, 7, 47, 102, 214, 237])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      metadata:
        (args.metadata && types.MetadataArgs.toEncodable(args.metadata)) ||
        null,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
