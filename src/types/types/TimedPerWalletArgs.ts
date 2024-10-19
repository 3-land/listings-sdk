import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface TimedPerWalletArgsFields {
  amount: number
}

export interface TimedPerWalletArgsJSON {
  amount: number
}

export class TimedPerWalletArgs {
  readonly amount: number

  constructor(fields: TimedPerWalletArgsFields) {
    this.amount = fields.amount
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("amount")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new TimedPerWalletArgs({
      amount: obj.amount,
    })
  }

  static toEncodable(fields: TimedPerWalletArgsFields) {
    return {
      amount: fields.amount,
    }
  }

  toJSON(): TimedPerWalletArgsJSON {
    return {
      amount: this.amount,
    }
  }

  static fromJSON(obj: TimedPerWalletArgsJSON): TimedPerWalletArgs {
    return new TimedPerWalletArgs({
      amount: obj.amount,
    })
  }

  toEncodable() {
    return TimedPerWalletArgs.toEncodable(this)
  }
}
