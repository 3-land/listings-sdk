import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NonFungibleTraitInitFields {
  hash: BN
  values: Array<BN>
}

export interface NonFungibleTraitInitJSON {
  hash: string
  values: Array<string>
}

export class NonFungibleTraitInit {
  readonly hash: BN
  readonly values: Array<BN>

  constructor(fields: NonFungibleTraitInitFields) {
    this.hash = fields.hash
    this.values = fields.values
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u64("hash"), borsh.vec(borsh.u64(), "values")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new NonFungibleTraitInit({
      hash: obj.hash,
      values: obj.values,
    })
  }

  static toEncodable(fields: NonFungibleTraitInitFields) {
    return {
      hash: fields.hash,
      values: fields.values,
    }
  }

  toJSON(): NonFungibleTraitInitJSON {
    return {
      hash: this.hash.toString(),
      values: this.values.map((item) => item.toString()),
    }
  }

  static fromJSON(obj: NonFungibleTraitInitJSON): NonFungibleTraitInit {
    return new NonFungibleTraitInit({
      hash: new BN(obj.hash),
      values: obj.values.map((item) => new BN(item)),
    })
  }

  toEncodable() {
    return NonFungibleTraitInit.toEncodable(this)
  }
}
