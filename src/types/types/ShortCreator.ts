import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ShortCreatorFields {
  address: PublicKey
  share: number
}

export interface ShortCreatorJSON {
  address: string
  share: number
}

export class ShortCreator {
  readonly address: PublicKey
  readonly share: number

  constructor(fields: ShortCreatorFields) {
    this.address = fields.address
    this.share = fields.share
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.publicKey("address"), borsh.u8("share")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ShortCreator({
      address: obj.address,
      share: obj.share,
    })
  }

  static toEncodable(fields: ShortCreatorFields) {
    return {
      address: fields.address,
      share: fields.share,
    }
  }

  toJSON(): ShortCreatorJSON {
    return {
      address: this.address.toString(),
      share: this.share,
    }
  }

  static fromJSON(obj: ShortCreatorJSON): ShortCreator {
    return new ShortCreator({
      address: new PublicKey(obj.address),
      share: obj.share,
    })
  }

  toEncodable() {
    return ShortCreator.toEncodable(this)
  }
}
