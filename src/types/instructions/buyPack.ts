import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface BuyPackArgs {
  proof: types.CurrencyArtistProofFields | null
  amountPerPack: number
  randomBase: BN
  fee: number
}

export interface BuyPackAccounts {
  owner: PublicKey
  packAccount: PublicKey
  packOpenAccount: PublicKey
  storeAccount: PublicKey
  packContent: PublicKey
  paymentAccount: PublicKey
  claimer: PublicKey
  buytrackAccount: PublicKey
  payer: PublicKey
  randomizer: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.option(types.CurrencyArtistProof.layout(), "proof"),
  borsh.u8("amountPerPack"),
  borsh.u64("randomBase"),
  borsh.u8("fee"),
])

export function buyPack(
  args: BuyPackArgs,
  accounts: BuyPackAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.owner, isSigner: false, isWritable: false },
    { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.packOpenAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.packContent, isSigner: false, isWritable: true },
    { pubkey: accounts.paymentAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.claimer, isSigner: false, isWritable: true },
    { pubkey: accounts.buytrackAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.randomizer, isSigner: true, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([151, 46, 141, 93, 174, 5, 49, 173])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      proof:
        (args.proof && types.CurrencyArtistProof.toEncodable(args.proof)) ||
        null,
      amountPerPack: args.amountPerPack,
      randomBase: args.randomBase,
      fee: args.fee,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
