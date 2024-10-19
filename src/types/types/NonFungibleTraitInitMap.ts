import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NonFungibleTraitInitMapFields {
  hash: BN
  values: Array<types.FakeTraitValueFields>
  index: number
}

export interface NonFungibleTraitInitMapJSON {
  hash: string
  values: Array<types.FakeTraitValueJSON>
  index: number
}

export class NonFungibleTraitInitMap {
  readonly hash: BN
  readonly values: Array<types.FakeTraitValue>
  readonly index: number

  constructor(fields: NonFungibleTraitInitMapFields) {
    this.hash = fields.hash
    this.values = fields.values.map(
      (item) => new types.FakeTraitValue({ ...item })
    )
    this.index = fields.index
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("hash"),
        borsh.vec(types.FakeTraitValue.layout(), "values"),
        borsh.u32("index"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new NonFungibleTraitInitMap({
      hash: obj.hash,
      values: obj.values.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.FakeTraitValue.fromDecoded(item)
      ),
      index: obj.index,
    })
  }

  static toEncodable(fields: NonFungibleTraitInitMapFields) {
    return {
      hash: fields.hash,
      values: fields.values.map((item) =>
        types.FakeTraitValue.toEncodable(item)
      ),
      index: fields.index,
    }
  }

  toJSON(): NonFungibleTraitInitMapJSON {
    return {
      hash: this.hash.toString(),
      values: this.values.map((item) => item.toJSON()),
      index: this.index,
    }
  }

  static fromJSON(obj: NonFungibleTraitInitMapJSON): NonFungibleTraitInitMap {
    return new NonFungibleTraitInitMap({
      hash: new BN(obj.hash),
      values: obj.values.map((item) => types.FakeTraitValue.fromJSON(item)),
      index: obj.index,
    })
  }

  toEncodable() {
    return NonFungibleTraitInitMap.toEncodable(this)
  }
}
