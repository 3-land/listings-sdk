import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterUserArgs {
  username: string
  sub: PublicKey
  lut: PublicKey
}

export interface RegisterUserAccounts {
  threeId: PublicKey
  storeAccount: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.str("username"),
  borsh.publicKey("sub"),
  borsh.publicKey("lut"),
])

export function registerUser(
  args: RegisterUserArgs,
  accounts: RegisterUserAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.threeId, isSigner: false, isWritable: true },
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([2, 241, 150, 223, 99, 214, 116, 97])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      username: args.username,
      sub: args.sub,
      lut: args.lut,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
