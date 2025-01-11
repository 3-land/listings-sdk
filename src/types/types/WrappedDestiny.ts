import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface WrappedDestinyFields {
  pool: PublicKey
  destinyType: number
  flag1: number
}

export interface WrappedDestinyJSON {
  pool: string
  destinyType: number
  flag1: number
}

export class WrappedDestiny {
  readonly pool: PublicKey
  readonly destinyType: number
  readonly flag1: number

  constructor(fields: WrappedDestinyFields) {
    this.pool = fields.pool
    this.destinyType = fields.destinyType
    this.flag1 = fields.flag1
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.publicKey("pool"), borsh.u8("destinyType"), borsh.u8("flag1")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new WrappedDestiny({
      pool: obj.pool,
      destinyType: obj.destinyType,
      flag1: obj.flag1,
    })
  }

  static toEncodable(fields: WrappedDestinyFields) {
    return {
      pool: fields.pool,
      destinyType: fields.destinyType,
      flag1: fields.flag1,
    }
  }

  toJSON(): WrappedDestinyJSON {
    return {
      pool: this.pool.toString(),
      destinyType: this.destinyType,
      flag1: this.flag1,
    }
  }

  static fromJSON(obj: WrappedDestinyJSON): WrappedDestiny {
    return new WrappedDestiny({
      pool: new PublicKey(obj.pool),
      destinyType: obj.destinyType,
      flag1: obj.flag1,
    })
  }

  toEncodable() {
    return WrappedDestiny.toEncodable(this)
  }
}
