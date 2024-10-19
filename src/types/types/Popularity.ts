import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface PopularityFields {
  lastReset: number
  count: BN
  state: types.PopularityStateKind
}

export interface PopularityJSON {
  lastReset: number
  count: string
  state: types.PopularityStateJSON
}

export class Popularity {
  readonly lastReset: number
  readonly count: BN
  readonly state: types.PopularityStateKind

  constructor(fields: PopularityFields) {
    this.lastReset = fields.lastReset
    this.count = fields.count
    this.state = fields.state
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u16("lastReset"),
        borsh.u64("count"),
        types.PopularityState.layout("state"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Popularity({
      lastReset: obj.lastReset,
      count: obj.count,
      state: types.PopularityState.fromDecoded(obj.state),
    })
  }

  static toEncodable(fields: PopularityFields) {
    return {
      lastReset: fields.lastReset,
      count: fields.count,
      state: fields.state.toEncodable(),
    }
  }

  toJSON(): PopularityJSON {
    return {
      lastReset: this.lastReset,
      count: this.count.toString(),
      state: this.state.toJSON(),
    }
  }

  static fromJSON(obj: PopularityJSON): Popularity {
    return new Popularity({
      lastReset: obj.lastReset,
      count: new BN(obj.count),
      state: types.PopularityState.fromJSON(obj.state),
    })
  }

  toEncodable() {
    return Popularity.toEncodable(this)
  }
}
