import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OnlyTheseDOWArgsFields {
  days: number
}

export interface OnlyTheseDOWArgsJSON {
  days: number
}

export class OnlyTheseDOWArgs {
  readonly days: number

  constructor(fields: OnlyTheseDOWArgsFields) {
    this.days = fields.days
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u8("days")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OnlyTheseDOWArgs({
      days: obj.days,
    })
  }

  static toEncodable(fields: OnlyTheseDOWArgsFields) {
    return {
      days: fields.days,
    }
  }

  toJSON(): OnlyTheseDOWArgsJSON {
    return {
      days: this.days,
    }
  }

  static fromJSON(obj: OnlyTheseDOWArgsJSON): OnlyTheseDOWArgs {
    return new OnlyTheseDOWArgs({
      days: obj.days,
    })
  }

  toEncodable() {
    return OnlyTheseDOWArgs.toEncodable(this)
  }
}
