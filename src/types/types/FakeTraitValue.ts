import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FakeTraitValueFields {
  trait_value: BN
  state: number
}

export interface FakeTraitValueJSON {
  trait_value: string
  state: number
}

export class FakeTraitValue {
  readonly trait_value: BN
  readonly state: number

  constructor(fields: FakeTraitValueFields) {
    this.trait_value = fields.trait_value
    this.state = fields.state
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("trait_value"), borsh.u8("state")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FakeTraitValue({
      trait_value: obj.trait_value,
      state: obj.state,
    })
  }

  static toEncodable(fields: FakeTraitValueFields) {
    return {
      trait_value: fields.trait_value,
      state: fields.state,
    }
  }

  toJSON(): FakeTraitValueJSON {
    return {
      trait_value: this.trait_value.toString(),
      state: this.state,
    }
  }

  static fromJSON(obj: FakeTraitValueJSON): FakeTraitValue {
    return new FakeTraitValue({
      trait_value: new BN(obj.trait_value),
      state: obj.state,
    })
  }

  toEncodable() {
    return FakeTraitValue.toEncodable(this)
  }
}
