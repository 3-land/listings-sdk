import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CompactCnftDataFields {
  root: Array<number>
  arweave: string
  index: number
}

export interface CompactCnftDataJSON {
  root: Array<number>
  arweave: string
  index: number
}

export class CompactCnftData {
  readonly root: Array<number>
  readonly arweave: string
  readonly index: number

  constructor(fields: CompactCnftDataFields) {
    this.root = fields.root
    this.arweave = fields.arweave
    this.index = fields.index
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.array(borsh.u8(), 32, "root"),
        borsh.str("arweave"),
        borsh.u32("index"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CompactCnftData({
      root: obj.root,
      arweave: obj.arweave,
      index: obj.index,
    })
  }

  static toEncodable(fields: CompactCnftDataFields) {
    return {
      root: fields.root,
      arweave: fields.arweave,
      index: fields.index,
    }
  }

  toJSON(): CompactCnftDataJSON {
    return {
      root: this.root,
      arweave: this.arweave,
      index: this.index,
    }
  }

  static fromJSON(obj: CompactCnftDataJSON): CompactCnftData {
    return new CompactCnftData({
      root: obj.root,
      arweave: obj.arweave,
      index: obj.index,
    })
  }

  toEncodable() {
    return CompactCnftData.toEncodable(this)
  }
}
