import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ListingPerWalletArgsFields {
  amount: number
}

export interface ListingPerWalletArgsJSON {
  amount: number
}

export class ListingPerWalletArgs {
  readonly amount: number

  constructor(fields: ListingPerWalletArgsFields) {
    this.amount = fields.amount
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("amount")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ListingPerWalletArgs({
      amount: obj.amount,
    })
  }

  static toEncodable(fields: ListingPerWalletArgsFields) {
    return {
      amount: fields.amount,
    }
  }

  toJSON(): ListingPerWalletArgsJSON {
    return {
      amount: this.amount,
    }
  }

  static fromJSON(obj: ListingPerWalletArgsJSON): ListingPerWalletArgs {
    return new ListingPerWalletArgs({
      amount: obj.amount,
    })
  }

  toEncodable() {
    return ListingPerWalletArgs.toEncodable(this)
  }
}
