import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface TraitValueFields {
  hash: BN
  count: number
  supply: BN
}

export interface TraitValueJSON {
  hash: string
  count: number
  supply: string
}

export class TraitValue {
  readonly hash: BN
  readonly count: number
  readonly supply: BN

  constructor(fields: TraitValueFields) {
    this.hash = fields.hash
    this.count = fields.count
    this.supply = fields.supply
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u64("hash"), borsh.u32("count"), borsh.u64("supply")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new TraitValue({
      hash: obj.hash,
      count: obj.count,
      supply: obj.supply,
    })
  }

  static toEncodable(fields: TraitValueFields) {
    return {
      hash: fields.hash,
      count: fields.count,
      supply: fields.supply,
    }
  }

  toJSON(): TraitValueJSON {
    return {
      hash: this.hash.toString(),
      count: this.count,
      supply: this.supply.toString(),
    }
  }

  static fromJSON(obj: TraitValueJSON): TraitValue {
    return new TraitValue({
      hash: new BN(obj.hash),
      count: obj.count,
      supply: new BN(obj.supply),
    })
  }

  toEncodable() {
    return TraitValue.toEncodable(this)
  }
}
