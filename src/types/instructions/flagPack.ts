import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface FlagPackArgs {
  globalState: types.GlobalStateKind | null
  state: types.ItemStateKind | null
  serverless: number | null
}

export interface FlagPackAccounts {
  storeAccount: PublicKey
  packAccount: PublicKey
  creator: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.option(types.GlobalState.layout(), "globalState"),
  borsh.option(types.ItemState.layout(), "state"),
  borsh.option(borsh.u8(), "serverless"),
])

export function flagPack(
  args: FlagPackArgs,
  accounts: FlagPackAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.creator, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([239, 234, 126, 90, 79, 52, 91, 71])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      globalState: (args.globalState && args.globalState.toEncodable()) || null,
      state: (args.state && args.state.toEncodable()) || null,
      serverless: args.serverless,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
