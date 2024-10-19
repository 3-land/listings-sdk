import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdatePackArgs {
  supply: BN | null
  metadata: types.MetadataArgsFields | null
  saleConfig: types.SaleConfigFields | null
  state: types.ItemStateKind | null
  category: Array<number> | null
  packConfig: types.PackConfigFields | null
}

export interface UpdatePackAccounts {
  storeAccount: PublicKey
  packAccount: PublicKey
  packContent: PublicKey
  packReserveList: PublicKey
  prevCreatorRegistry: PublicKey
  creator: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.option(borsh.u64(), "supply"),
  borsh.option(types.MetadataArgs.layout(), "metadata"),
  borsh.option(types.SaleConfig.layout(), "saleConfig"),
  borsh.option(types.ItemState.layout(), "state"),
  borsh.option(borsh.array(borsh.u16(), 3), "category"),
  borsh.option(types.PackConfig.layout(), "packConfig"),
])

export function updatePack(
  args: UpdatePackArgs,
  accounts: UpdatePackAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.packContent, isSigner: false, isWritable: false },
    { pubkey: accounts.packReserveList, isSigner: false, isWritable: true },
    { pubkey: accounts.prevCreatorRegistry, isSigner: false, isWritable: true },
    { pubkey: accounts.creator, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([71, 204, 227, 31, 168, 43, 152, 234])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      supply: args.supply,
      metadata:
        (args.metadata && types.MetadataArgs.toEncodable(args.metadata)) ||
        null,
      saleConfig:
        (args.saleConfig && types.SaleConfig.toEncodable(args.saleConfig)) ||
        null,
      state: (args.state && args.state.toEncodable()) || null,
      category: args.category,
      packConfig:
        (args.packConfig && types.PackConfig.toEncodable(args.packConfig)) ||
        null,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
