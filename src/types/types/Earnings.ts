import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface EarningsFields {}

export interface EarningsJSON {}

export class Earnings {
  constructor(fields: EarningsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Earnings({})
  }

  static toEncodable(fields: EarningsFields) {
    return {}
  }

  toJSON(): EarningsJSON {
    return {}
  }

  static fromJSON(obj: EarningsJSON): Earnings {
    return new Earnings({})
  }

  toEncodable() {
    return Earnings.toEncodable(this)
  }
}
