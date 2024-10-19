import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CategoryFields {
  cat1: number
  cat2: number
  cat3: number
}

export interface CategoryJSON {
  cat1: number
  cat2: number
  cat3: number
}

export class Category {
  readonly cat1: number
  readonly cat2: number
  readonly cat3: number

  constructor(fields: CategoryFields) {
    this.cat1 = fields.cat1
    this.cat2 = fields.cat2
    this.cat3 = fields.cat3
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u16("cat1"), borsh.u16("cat2"), borsh.u16("cat3")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Category({
      cat1: obj.cat1,
      cat2: obj.cat2,
      cat3: obj.cat3,
    })
  }

  static toEncodable(fields: CategoryFields) {
    return {
      cat1: fields.cat1,
      cat2: fields.cat2,
      cat3: fields.cat3,
    }
  }

  toJSON(): CategoryJSON {
    return {
      cat1: this.cat1,
      cat2: this.cat2,
      cat3: this.cat3,
    }
  }

  static fromJSON(obj: CategoryJSON): Category {
    return new Category({
      cat1: obj.cat1,
      cat2: obj.cat2,
      cat3: obj.cat3,
    })
  }

  toEncodable() {
    return Category.toEncodable(this)
  }
}
