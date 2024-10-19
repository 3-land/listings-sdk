import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OnlyBetweenTimesArgsFields {
  start: number
  end: number
  rangeType: types.TimeRangeTypeKind
}

export interface OnlyBetweenTimesArgsJSON {
  start: number
  end: number
  rangeType: types.TimeRangeTypeJSON
}

export class OnlyBetweenTimesArgs {
  readonly start: number
  readonly end: number
  readonly rangeType: types.TimeRangeTypeKind

  constructor(fields: OnlyBetweenTimesArgsFields) {
    this.start = fields.start
    this.end = fields.end
    this.rangeType = fields.rangeType
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u32("start"),
        borsh.u32("end"),
        types.TimeRangeType.layout("rangeType"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OnlyBetweenTimesArgs({
      start: obj.start,
      end: obj.end,
      rangeType: types.TimeRangeType.fromDecoded(obj.rangeType),
    })
  }

  static toEncodable(fields: OnlyBetweenTimesArgsFields) {
    return {
      start: fields.start,
      end: fields.end,
      rangeType: fields.rangeType.toEncodable(),
    }
  }

  toJSON(): OnlyBetweenTimesArgsJSON {
    return {
      start: this.start,
      end: this.end,
      rangeType: this.rangeType.toJSON(),
    }
  }

  static fromJSON(obj: OnlyBetweenTimesArgsJSON): OnlyBetweenTimesArgs {
    return new OnlyBetweenTimesArgs({
      start: obj.start,
      end: obj.end,
      rangeType: types.TimeRangeType.fromJSON(obj.rangeType),
    })
  }

  toEncodable() {
    return OnlyBetweenTimesArgs.toEncodable(this)
  }
}
