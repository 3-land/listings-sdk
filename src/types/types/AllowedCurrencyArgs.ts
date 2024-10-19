import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface AllowedCurrencyArgsFields {
  id: number
}

export interface AllowedCurrencyArgsJSON {
  id: number
}

export class AllowedCurrencyArgs {
  readonly id: number

  constructor(fields: AllowedCurrencyArgsFields) {
    this.id = fields.id
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("id")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new AllowedCurrencyArgs({
      id: obj.id,
    })
  }

  static toEncodable(fields: AllowedCurrencyArgsFields) {
    return {
      id: fields.id,
    }
  }

  toJSON(): AllowedCurrencyArgsJSON {
    return {
      id: this.id,
    }
  }

  static fromJSON(obj: AllowedCurrencyArgsJSON): AllowedCurrencyArgs {
    return new AllowedCurrencyArgs({
      id: obj.id,
    })
  }

  toEncodable() {
    return AllowedCurrencyArgs.toEncodable(this)
  }
}
