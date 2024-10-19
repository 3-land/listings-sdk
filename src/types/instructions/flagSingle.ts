import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface FlagSingleArgs {
  globalState: types.GlobalStateKind
  state: types.ItemStateKind
}

export interface FlagSingleAccounts {
  storeAccount: PublicKey
  itemAccount: PublicKey
  creator: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.GlobalState.layout("globalState"),
  types.ItemState.layout("state"),
])

export function flagSingle(
  args: FlagSingleArgs,
  accounts: FlagSingleAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.itemAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.creator, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([8, 218, 103, 215, 236, 37, 163, 190])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      globalState: args.globalState.toEncodable(),
      state: args.state.toEncodable(),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
