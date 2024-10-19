import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SemiFungibleTraitInitMapFields {
  hash: BN
  amount: BN
  index: number
}

export interface SemiFungibleTraitInitMapJSON {
  hash: string
  amount: string
  index: number
}

export class SemiFungibleTraitInitMap {
  readonly hash: BN
  readonly amount: BN
  readonly index: number

  constructor(fields: SemiFungibleTraitInitMapFields) {
    this.hash = fields.hash
    this.amount = fields.amount
    this.index = fields.index
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u64("hash"), borsh.u64("amount"), borsh.u32("index")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SemiFungibleTraitInitMap({
      hash: obj.hash,
      amount: obj.amount,
      index: obj.index,
    })
  }

  static toEncodable(fields: SemiFungibleTraitInitMapFields) {
    return {
      hash: fields.hash,
      amount: fields.amount,
      index: fields.index,
    }
  }

  toJSON(): SemiFungibleTraitInitMapJSON {
    return {
      hash: this.hash.toString(),
      amount: this.amount.toString(),
      index: this.index,
    }
  }

  static fromJSON(obj: SemiFungibleTraitInitMapJSON): SemiFungibleTraitInitMap {
    return new SemiFungibleTraitInitMap({
      hash: new BN(obj.hash),
      amount: new BN(obj.amount),
      index: obj.index,
    })
  }

  toEncodable() {
    return SemiFungibleTraitInitMap.toEncodable(this)
  }
}
