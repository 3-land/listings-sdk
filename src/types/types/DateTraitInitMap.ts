import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface DateTraitInitMapFields {
  hash: BN
  date: number
  index: number
}

export interface DateTraitInitMapJSON {
  hash: string
  date: number
  index: number
}

export class DateTraitInitMap {
  readonly hash: BN
  readonly date: number
  readonly index: number

  constructor(fields: DateTraitInitMapFields) {
    this.hash = fields.hash
    this.date = fields.date
    this.index = fields.index
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u64("hash"), borsh.u32("date"), borsh.u32("index")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new DateTraitInitMap({
      hash: obj.hash,
      date: obj.date,
      index: obj.index,
    })
  }

  static toEncodable(fields: DateTraitInitMapFields) {
    return {
      hash: fields.hash,
      date: fields.date,
      index: fields.index,
    }
  }

  toJSON(): DateTraitInitMapJSON {
    return {
      hash: this.hash.toString(),
      date: this.date,
      index: this.index,
    }
  }

  static fromJSON(obj: DateTraitInitMapJSON): DateTraitInitMap {
    return new DateTraitInitMap({
      hash: new BN(obj.hash),
      date: obj.date,
      index: obj.index,
    })
  }

  toEncodable() {
    return DateTraitInitMap.toEncodable(this)
  }
}
