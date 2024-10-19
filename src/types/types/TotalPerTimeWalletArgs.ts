import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface TotalPerTimeWalletArgsFields {
  amount: number
  time: number
}

export interface TotalPerTimeWalletArgsJSON {
  amount: number
  time: number
}

export class TotalPerTimeWalletArgs {
  readonly amount: number
  readonly time: number

  constructor(fields: TotalPerTimeWalletArgsFields) {
    this.amount = fields.amount
    this.time = fields.time
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("amount"), borsh.u32("time")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new TotalPerTimeWalletArgs({
      amount: obj.amount,
      time: obj.time,
    })
  }

  static toEncodable(fields: TotalPerTimeWalletArgsFields) {
    return {
      amount: fields.amount,
      time: fields.time,
    }
  }

  toJSON(): TotalPerTimeWalletArgsJSON {
    return {
      amount: this.amount,
      time: this.time,
    }
  }

  static fromJSON(obj: TotalPerTimeWalletArgsJSON): TotalPerTimeWalletArgs {
    return new TotalPerTimeWalletArgs({
      amount: obj.amount,
      time: obj.time,
    })
  }

  toEncodable() {
    return TotalPerTimeWalletArgs.toEncodable(this)
  }
}
