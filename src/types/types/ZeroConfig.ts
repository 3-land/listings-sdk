import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ZeroConfigFields {
  bytes: number
  chunks: Array<number>
  chunkSize: number
  supplyChunkBytes: number
}

export interface ZeroConfigJSON {
  bytes: number
  chunks: Array<number>
  chunkSize: number
  supplyChunkBytes: number
}

export class ZeroConfig {
  readonly bytes: number
  readonly chunks: Array<number>
  readonly chunkSize: number
  readonly supplyChunkBytes: number

  constructor(fields: ZeroConfigFields) {
    this.bytes = fields.bytes
    this.chunks = fields.chunks
    this.chunkSize = fields.chunkSize
    this.supplyChunkBytes = fields.supplyChunkBytes
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u8("bytes"),
        borsh.array(borsh.u8(), 2, "chunks"),
        borsh.u8("chunkSize"),
        borsh.u8("supplyChunkBytes"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ZeroConfig({
      bytes: obj.bytes,
      chunks: obj.chunks,
      chunkSize: obj.chunkSize,
      supplyChunkBytes: obj.supplyChunkBytes,
    })
  }

  static toEncodable(fields: ZeroConfigFields) {
    return {
      bytes: fields.bytes,
      chunks: fields.chunks,
      chunkSize: fields.chunkSize,
      supplyChunkBytes: fields.supplyChunkBytes,
    }
  }

  toJSON(): ZeroConfigJSON {
    return {
      bytes: this.bytes,
      chunks: this.chunks,
      chunkSize: this.chunkSize,
      supplyChunkBytes: this.supplyChunkBytes,
    }
  }

  static fromJSON(obj: ZeroConfigJSON): ZeroConfig {
    return new ZeroConfig({
      bytes: obj.bytes,
      chunks: obj.chunks,
      chunkSize: obj.chunkSize,
      supplyChunkBytes: obj.supplyChunkBytes,
    })
  }

  toEncodable() {
    return ZeroConfig.toEncodable(this)
  }
}
