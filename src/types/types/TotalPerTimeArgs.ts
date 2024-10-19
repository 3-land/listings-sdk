import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface TotalPerTimeArgsFields {
  count: number
  amount: number
  time: number
  lastTimeReset: number
}

export interface TotalPerTimeArgsJSON {
  count: number
  amount: number
  time: number
  lastTimeReset: number
}

export class TotalPerTimeArgs {
  readonly count: number
  readonly amount: number
  readonly time: number
  readonly lastTimeReset: number

  constructor(fields: TotalPerTimeArgsFields) {
    this.count = fields.count
    this.amount = fields.amount
    this.time = fields.time
    this.lastTimeReset = fields.lastTimeReset
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u16("count"),
        borsh.u16("amount"),
        borsh.u32("time"),
        borsh.u32("lastTimeReset"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new TotalPerTimeArgs({
      count: obj.count,
      amount: obj.amount,
      time: obj.time,
      lastTimeReset: obj.lastTimeReset,
    })
  }

  static toEncodable(fields: TotalPerTimeArgsFields) {
    return {
      count: fields.count,
      amount: fields.amount,
      time: fields.time,
      lastTimeReset: fields.lastTimeReset,
    }
  }

  toJSON(): TotalPerTimeArgsJSON {
    return {
      count: this.count,
      amount: this.amount,
      time: this.time,
      lastTimeReset: this.lastTimeReset,
    }
  }

  static fromJSON(obj: TotalPerTimeArgsJSON): TotalPerTimeArgs {
    return new TotalPerTimeArgs({
      count: obj.count,
      amount: obj.amount,
      time: obj.time,
      lastTimeReset: obj.lastTimeReset,
    })
  }

  toEncodable() {
    return TotalPerTimeArgs.toEncodable(this)
  }
}
