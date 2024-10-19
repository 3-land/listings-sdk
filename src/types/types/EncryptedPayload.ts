import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface EncryptedPayloadFields {
  encType: number
  arweave: string
}

export interface EncryptedPayloadJSON {
  encType: number
  arweave: string
}

export class EncryptedPayload {
  readonly encType: number
  readonly arweave: string

  constructor(fields: EncryptedPayloadFields) {
    this.encType = fields.encType
    this.arweave = fields.arweave
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u8("encType"), borsh.str("arweave")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new EncryptedPayload({
      encType: obj.encType,
      arweave: obj.arweave,
    })
  }

  static toEncodable(fields: EncryptedPayloadFields) {
    return {
      encType: fields.encType,
      arweave: fields.arweave,
    }
  }

  toJSON(): EncryptedPayloadJSON {
    return {
      encType: this.encType,
      arweave: this.arweave,
    }
  }

  static fromJSON(obj: EncryptedPayloadJSON): EncryptedPayload {
    return new EncryptedPayload({
      encType: obj.encType,
      arweave: obj.arweave,
    })
  }

  toEncodable() {
    return EncryptedPayload.toEncodable(this)
  }
}
