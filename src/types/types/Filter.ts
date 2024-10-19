import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FilterFields {
  filter1: types.FilterTypeKind
  filter2: types.FilterTypeKind
}

export interface FilterJSON {
  filter1: types.FilterTypeJSON
  filter2: types.FilterTypeJSON
}

export class Filter {
  readonly filter1: types.FilterTypeKind
  readonly filter2: types.FilterTypeKind

  constructor(fields: FilterFields) {
    this.filter1 = fields.filter1
    this.filter2 = fields.filter2
  }

  static layout(property?: string) {
    return borsh.struct(
      [types.FilterType.layout("filter1"), types.FilterType.layout("filter2")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Filter({
      filter1: types.FilterType.fromDecoded(obj.filter1),
      filter2: types.FilterType.fromDecoded(obj.filter2),
    })
  }

  static toEncodable(fields: FilterFields) {
    return {
      filter1: fields.filter1.toEncodable(),
      filter2: fields.filter2.toEncodable(),
    }
  }

  toJSON(): FilterJSON {
    return {
      filter1: this.filter1.toJSON(),
      filter2: this.filter2.toJSON(),
    }
  }

  static fromJSON(obj: FilterJSON): Filter {
    return new Filter({
      filter1: types.FilterType.fromJSON(obj.filter1),
      filter2: types.FilterType.fromJSON(obj.filter2),
    })
  }

  toEncodable() {
    return Filter.toEncodable(this)
  }
}
