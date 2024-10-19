import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CnftDataFields {
  root: Array<number>
  dataHash: Array<number>
  creatorHash: Array<number>
  index: number
}

export interface CnftDataJSON {
  root: Array<number>
  dataHash: Array<number>
  creatorHash: Array<number>
  index: number
}

export class CnftData {
  readonly root: Array<number>
  readonly dataHash: Array<number>
  readonly creatorHash: Array<number>
  readonly index: number

  constructor(fields: CnftDataFields) {
    this.root = fields.root
    this.dataHash = fields.dataHash
    this.creatorHash = fields.creatorHash
    this.index = fields.index
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.array(borsh.u8(), 32, "root"),
        borsh.array(borsh.u8(), 32, "dataHash"),
        borsh.array(borsh.u8(), 32, "creatorHash"),
        borsh.u32("index"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CnftData({
      root: obj.root,
      dataHash: obj.dataHash,
      creatorHash: obj.creatorHash,
      index: obj.index,
    })
  }

  static toEncodable(fields: CnftDataFields) {
    return {
      root: fields.root,
      dataHash: fields.dataHash,
      creatorHash: fields.creatorHash,
      index: fields.index,
    }
  }

  toJSON(): CnftDataJSON {
    return {
      root: this.root,
      dataHash: this.dataHash,
      creatorHash: this.creatorHash,
      index: this.index,
    }
  }

  static fromJSON(obj: CnftDataJSON): CnftData {
    return new CnftData({
      root: obj.root,
      dataHash: obj.dataHash,
      creatorHash: obj.creatorHash,
      index: obj.index,
    })
  }

  toEncodable() {
    return CnftData.toEncodable(this)
  }
}
