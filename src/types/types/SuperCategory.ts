import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SuperCategoryFields {
  cat1: number
  cat2: number
}

export interface SuperCategoryJSON {
  cat1: number
  cat2: number
}

export class SuperCategory {
  readonly cat1: number
  readonly cat2: number

  constructor(fields: SuperCategoryFields) {
    this.cat1 = fields.cat1
    this.cat2 = fields.cat2
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u8("cat1"), borsh.u8("cat2")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SuperCategory({
      cat1: obj.cat1,
      cat2: obj.cat2,
    })
  }

  static toEncodable(fields: SuperCategoryFields) {
    return {
      cat1: fields.cat1,
      cat2: fields.cat2,
    }
  }

  toJSON(): SuperCategoryJSON {
    return {
      cat1: this.cat1,
      cat2: this.cat2,
    }
  }

  static fromJSON(obj: SuperCategoryJSON): SuperCategory {
    return new SuperCategory({
      cat1: obj.cat1,
      cat2: obj.cat2,
    })
  }

  toEncodable() {
    return SuperCategory.toEncodable(this)
  }
}
