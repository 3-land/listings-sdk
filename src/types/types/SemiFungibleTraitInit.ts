import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SemiFungibleTraitInitFields {
  hash: BN
  amount: BN
}

export interface SemiFungibleTraitInitJSON {
  hash: string
  amount: string
}

export class SemiFungibleTraitInit {
  readonly hash: BN
  readonly amount: BN

  constructor(fields: SemiFungibleTraitInitFields) {
    this.hash = fields.hash
    this.amount = fields.amount
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("hash"), borsh.u64("amount")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SemiFungibleTraitInit({
      hash: obj.hash,
      amount: obj.amount,
    })
  }

  static toEncodable(fields: SemiFungibleTraitInitFields) {
    return {
      hash: fields.hash,
      amount: fields.amount,
    }
  }

  toJSON(): SemiFungibleTraitInitJSON {
    return {
      hash: this.hash.toString(),
      amount: this.amount.toString(),
    }
  }

  static fromJSON(obj: SemiFungibleTraitInitJSON): SemiFungibleTraitInit {
    return new SemiFungibleTraitInit({
      hash: new BN(obj.hash),
      amount: new BN(obj.amount),
    })
  }

  toEncodable() {
    return SemiFungibleTraitInit.toEncodable(this)
  }
}
