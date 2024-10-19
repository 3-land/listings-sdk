import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FakeTraitPairFields {
  trait_type: string
  value: string
}

export interface FakeTraitPairJSON {
  trait_type: string
  value: string
}

export class FakeTraitPair {
  readonly trait_type: string
  readonly value: string

  constructor(fields: FakeTraitPairFields) {
    this.trait_type = fields.trait_type
    this.value = fields.value
  }

  static layout(property?: string) {
    return borsh.struct([borsh.str("trait_type"), borsh.str("value")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FakeTraitPair({
      trait_type: obj.trait_type,
      value: obj.value,
    })
  }

  static toEncodable(fields: FakeTraitPairFields) {
    return {
      trait_type: fields.trait_type,
      value: fields.value,
    }
  }

  toJSON(): FakeTraitPairJSON {
    return {
      trait_type: this.trait_type,
      value: this.value,
    }
  }

  static fromJSON(obj: FakeTraitPairJSON): FakeTraitPair {
    return new FakeTraitPair({
      trait_type: obj.trait_type,
      value: obj.value,
    })
  }

  toEncodable() {
    return FakeTraitPair.toEncodable(this)
  }
}
