import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CoolTimePerAmountArgsFields {
  count: number
  amount: number
  time: number
}

export interface CoolTimePerAmountArgsJSON {
  count: number
  amount: number
  time: number
}

export class CoolTimePerAmountArgs {
  readonly count: number
  readonly amount: number
  readonly time: number

  constructor(fields: CoolTimePerAmountArgsFields) {
    this.count = fields.count
    this.amount = fields.amount
    this.time = fields.time
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u16("count"), borsh.u16("amount"), borsh.u32("time")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CoolTimePerAmountArgs({
      count: obj.count,
      amount: obj.amount,
      time: obj.time,
    })
  }

  static toEncodable(fields: CoolTimePerAmountArgsFields) {
    return {
      count: fields.count,
      amount: fields.amount,
      time: fields.time,
    }
  }

  toJSON(): CoolTimePerAmountArgsJSON {
    return {
      count: this.count,
      amount: this.amount,
      time: this.time,
    }
  }

  static fromJSON(obj: CoolTimePerAmountArgsJSON): CoolTimePerAmountArgs {
    return new CoolTimePerAmountArgs({
      count: obj.count,
      amount: obj.amount,
      time: obj.time,
    })
  }

  toEncodable() {
    return CoolTimePerAmountArgs.toEncodable(this)
  }
}
