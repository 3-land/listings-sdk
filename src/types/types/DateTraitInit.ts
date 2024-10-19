import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface DateTraitInitFields {
  hash: BN
  date: number
}

export interface DateTraitInitJSON {
  hash: string
  date: number
}

export class DateTraitInit {
  readonly hash: BN
  readonly date: number

  constructor(fields: DateTraitInitFields) {
    this.hash = fields.hash
    this.date = fields.date
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("hash"), borsh.u32("date")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new DateTraitInit({
      hash: obj.hash,
      date: obj.date,
    })
  }

  static toEncodable(fields: DateTraitInitFields) {
    return {
      hash: fields.hash,
      date: fields.date,
    }
  }

  toJSON(): DateTraitInitJSON {
    return {
      hash: this.hash.toString(),
      date: this.date,
    }
  }

  static fromJSON(obj: DateTraitInitJSON): DateTraitInit {
    return new DateTraitInit({
      hash: new BN(obj.hash),
      date: obj.date,
    })
  }

  toEncodable() {
    return DateTraitInit.toEncodable(this)
  }
}
