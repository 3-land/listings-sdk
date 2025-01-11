import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdateMetadataFields {
  name: string
  uri: string
  uriType: number
  hashTraits: BN
}

export interface UpdateMetadataJSON {
  name: string
  uri: string
  uriType: number
  hashTraits: string
}

export class UpdateMetadata {
  readonly name: string
  readonly uri: string
  readonly uriType: number
  readonly hashTraits: BN

  constructor(fields: UpdateMetadataFields) {
    this.name = fields.name
    this.uri = fields.uri
    this.uriType = fields.uriType
    this.hashTraits = fields.hashTraits
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.str("name"),
        borsh.str("uri"),
        borsh.u8("uriType"),
        borsh.u64("hashTraits"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdateMetadata({
      name: obj.name,
      uri: obj.uri,
      uriType: obj.uriType,
      hashTraits: obj.hashTraits,
    })
  }

  static toEncodable(fields: UpdateMetadataFields) {
    return {
      name: fields.name,
      uri: fields.uri,
      uriType: fields.uriType,
      hashTraits: fields.hashTraits,
    }
  }

  toJSON(): UpdateMetadataJSON {
    return {
      name: this.name,
      uri: this.uri,
      uriType: this.uriType,
      hashTraits: this.hashTraits.toString(),
    }
  }

  static fromJSON(obj: UpdateMetadataJSON): UpdateMetadata {
    return new UpdateMetadata({
      name: obj.name,
      uri: obj.uri,
      uriType: obj.uriType,
      hashTraits: new BN(obj.hashTraits),
    })
  }

  toEncodable() {
    return UpdateMetadata.toEncodable(this)
  }
}
