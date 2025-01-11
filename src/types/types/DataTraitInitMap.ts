import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface DataTraitInitMapFields {
  hash: BN
  data: BN
  index: number
}

export interface DataTraitInitMapJSON {
  hash: string
  data: string
  index: number
}

export class DataTraitInitMap {
  readonly hash: BN
  readonly data: BN
  readonly index: number

  constructor(fields: DataTraitInitMapFields) {
    this.hash = fields.hash
    this.data = fields.data
    this.index = fields.index
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u64("hash"), borsh.u64("data"), borsh.u32("index")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new DataTraitInitMap({
      hash: obj.hash,
      data: obj.data,
      index: obj.index,
    })
  }

  static toEncodable(fields: DataTraitInitMapFields) {
    return {
      hash: fields.hash,
      data: fields.data,
      index: fields.index,
    }
  }

  toJSON(): DataTraitInitMapJSON {
    return {
      hash: this.hash.toString(),
      data: this.data.toString(),
      index: this.index,
    }
  }

  static fromJSON(obj: DataTraitInitMapJSON): DataTraitInitMap {
    return new DataTraitInitMap({
      hash: new BN(obj.hash),
      data: new BN(obj.data),
      index: obj.index,
    })
  }

  toEncodable() {
    return DataTraitInitMap.toEncodable(this)
  }
}
