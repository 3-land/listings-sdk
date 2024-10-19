import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UsesFields {
  useMethod: types.UseMethodKind
  remaining: BN
  total: BN
}

export interface UsesJSON {
  useMethod: types.UseMethodJSON
  remaining: string
  total: string
}

export class Uses {
  readonly useMethod: types.UseMethodKind
  readonly remaining: BN
  readonly total: BN

  constructor(fields: UsesFields) {
    this.useMethod = fields.useMethod
    this.remaining = fields.remaining
    this.total = fields.total
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        types.UseMethod.layout("useMethod"),
        borsh.u64("remaining"),
        borsh.u64("total"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Uses({
      useMethod: types.UseMethod.fromDecoded(obj.useMethod),
      remaining: obj.remaining,
      total: obj.total,
    })
  }

  static toEncodable(fields: UsesFields) {
    return {
      useMethod: fields.useMethod.toEncodable(),
      remaining: fields.remaining,
      total: fields.total,
    }
  }

  toJSON(): UsesJSON {
    return {
      useMethod: this.useMethod.toJSON(),
      remaining: this.remaining.toString(),
      total: this.total.toString(),
    }
  }

  static fromJSON(obj: UsesJSON): Uses {
    return new Uses({
      useMethod: types.UseMethod.fromJSON(obj.useMethod),
      remaining: new BN(obj.remaining),
      total: new BN(obj.total),
    })
  }

  toEncodable() {
    return Uses.toEncodable(this)
  }
}
