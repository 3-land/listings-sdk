import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface GenericStoreFields {
  storeType: number
  data: types.GenericValueKind
}

export interface GenericStoreJSON {
  storeType: number
  data: types.GenericValueJSON
}

export class GenericStore {
  readonly storeType: number
  readonly data: types.GenericValueKind

  constructor(fields: GenericStoreFields) {
    this.storeType = fields.storeType
    this.data = fields.data
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u16("storeType"), types.GenericValue.layout("data")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new GenericStore({
      storeType: obj.storeType,
      data: types.GenericValue.fromDecoded(obj.data),
    })
  }

  static toEncodable(fields: GenericStoreFields) {
    return {
      storeType: fields.storeType,
      data: fields.data.toEncodable(),
    }
  }

  toJSON(): GenericStoreJSON {
    return {
      storeType: this.storeType,
      data: this.data.toJSON(),
    }
  }

  static fromJSON(obj: GenericStoreJSON): GenericStore {
    return new GenericStore({
      storeType: obj.storeType,
      data: types.GenericValue.fromJSON(obj.data),
    })
  }

  toEncodable() {
    return GenericStore.toEncodable(this)
  }
}
