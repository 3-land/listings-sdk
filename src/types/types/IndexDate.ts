import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface IndexDateFields {
  hour: number
  day: number
  week: number
  month: number
  minRelative: number
}

export interface IndexDateJSON {
  hour: number
  day: number
  week: number
  month: number
  minRelative: number
}

export class IndexDate {
  readonly hour: number
  readonly day: number
  readonly week: number
  readonly month: number
  readonly minRelative: number

  constructor(fields: IndexDateFields) {
    this.hour = fields.hour
    this.day = fields.day
    this.week = fields.week
    this.month = fields.month
    this.minRelative = fields.minRelative
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u32("hour"),
        borsh.u32("day"),
        borsh.u32("week"),
        borsh.u32("month"),
        borsh.u8("minRelative"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new IndexDate({
      hour: obj.hour,
      day: obj.day,
      week: obj.week,
      month: obj.month,
      minRelative: obj.minRelative,
    })
  }

  static toEncodable(fields: IndexDateFields) {
    return {
      hour: fields.hour,
      day: fields.day,
      week: fields.week,
      month: fields.month,
      minRelative: fields.minRelative,
    }
  }

  toJSON(): IndexDateJSON {
    return {
      hour: this.hour,
      day: this.day,
      week: this.week,
      month: this.month,
      minRelative: this.minRelative,
    }
  }

  static fromJSON(obj: IndexDateJSON): IndexDate {
    return new IndexDate({
      hour: obj.hour,
      day: obj.day,
      week: obj.week,
      month: obj.month,
      minRelative: obj.minRelative,
    })
  }

  toEncodable() {
    return IndexDate.toEncodable(this)
  }
}
