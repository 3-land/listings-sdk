import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CollectionFields {
  verified: boolean
  key: PublicKey
}

export interface CollectionJSON {
  verified: boolean
  key: string
}

export class Collection {
  readonly verified: boolean
  readonly key: PublicKey

  constructor(fields: CollectionFields) {
    this.verified = fields.verified
    this.key = fields.key
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.bool("verified"), borsh.publicKey("key")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Collection({
      verified: obj.verified,
      key: obj.key,
    })
  }

  static toEncodable(fields: CollectionFields) {
    return {
      verified: fields.verified,
      key: fields.key,
    }
  }

  toJSON(): CollectionJSON {
    return {
      verified: this.verified,
      key: this.key.toString(),
    }
  }

  static fromJSON(obj: CollectionJSON): Collection {
    return new Collection({
      verified: obj.verified,
      key: new PublicKey(obj.key),
    })
  }

  toEncodable() {
    return Collection.toEncodable(this)
  }
}
