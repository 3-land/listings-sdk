import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SeedFields {
  seed: Uint8Array
}

export interface SeedJSON {
  seed: Array<number>
}

export class Seed {
  readonly seed: Uint8Array

  constructor(fields: SeedFields) {
    this.seed = fields.seed
  }

  static layout(property?: string) {
    return borsh.struct([borsh.vecU8("seed")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Seed({
      seed: new Uint8Array(
        obj.seed.buffer,
        obj.seed.byteOffset,
        obj.seed.length
      ),
    })
  }

  static toEncodable(fields: SeedFields) {
    return {
      seed: Buffer.from(
        fields.seed.buffer,
        fields.seed.byteOffset,
        fields.seed.length
      ),
    }
  }

  toJSON(): SeedJSON {
    return {
      seed: Array.from(this.seed.values()),
    }
  }

  static fromJSON(obj: SeedJSON): Seed {
    return new Seed({
      seed: Uint8Array.from(obj.seed),
    })
  }

  toEncodable() {
    return Seed.toEncodable(this)
  }
}
