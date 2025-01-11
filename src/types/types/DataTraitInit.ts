import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface DataTraitInitFields {
  hash: BN
  data: BN
}

export interface DataTraitInitJSON {
  hash: string
  data: string
}

export class DataTraitInit {
  readonly hash: BN
  readonly data: BN

  constructor(fields: DataTraitInitFields) {
    this.hash = fields.hash
    this.data = fields.data
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("hash"), borsh.u64("data")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new DataTraitInit({
      hash: obj.hash,
      data: obj.data,
    })
  }

  static toEncodable(fields: DataTraitInitFields) {
    return {
      hash: fields.hash,
      data: fields.data,
    }
  }

  toJSON(): DataTraitInitJSON {
    return {
      hash: this.hash.toString(),
      data: this.data.toString(),
    }
  }

  static fromJSON(obj: DataTraitInitJSON): DataTraitInit {
    return new DataTraitInit({
      hash: new BN(obj.hash),
      data: new BN(obj.data),
    })
  }

  toEncodable() {
    return DataTraitInit.toEncodable(this)
  }
}
