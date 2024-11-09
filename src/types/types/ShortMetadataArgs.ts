import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ShortMetadataArgsFields {
  name: string
  uri: string
  uriType: number
  sellerFeeBasisPoints: number
  collection: PublicKey
  creators: Array<types.ShortCreatorFields>
}

export interface ShortMetadataArgsJSON {
  name: string
  uri: string
  uriType: number
  sellerFeeBasisPoints: number
  collection: string
  creators: Array<types.ShortCreatorJSON>
}

export class ShortMetadataArgs {
  readonly name: string
  readonly uri: string
  readonly uriType: number
  readonly sellerFeeBasisPoints: number
  readonly collection: PublicKey
  readonly creators: Array<types.ShortCreator>

  constructor(fields: ShortMetadataArgsFields) {
    this.name = fields.name
    this.uri = fields.uri
    this.uriType = fields.uriType
    this.sellerFeeBasisPoints = fields.sellerFeeBasisPoints
    this.collection = fields.collection
    this.creators = fields.creators.map(
      (item) => new types.ShortCreator({ ...item })
    )
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.str("name"),
        borsh.str("uri"),
        borsh.u8("uriType"),
        borsh.u16("sellerFeeBasisPoints"),
        borsh.publicKey("collection"),
        borsh.vec(types.ShortCreator.layout(), "creators"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ShortMetadataArgs({
      name: obj.name,
      uri: obj.uri,
      uriType: obj.uriType,
      sellerFeeBasisPoints: obj.sellerFeeBasisPoints,
      collection: obj.collection,
      creators: obj.creators.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.ShortCreator.fromDecoded(item)
      ),
    })
  }

  static toEncodable(fields: ShortMetadataArgsFields) {
    return {
      name: fields.name,
      uri: fields.uri,
      uriType: fields.uriType,
      sellerFeeBasisPoints: fields.sellerFeeBasisPoints,
      collection: fields.collection,
      creators: fields.creators.map((item) =>
        types.ShortCreator.toEncodable(item)
      ),
    }
  }

  toJSON(): ShortMetadataArgsJSON {
    return {
      name: this.name,
      uri: this.uri,
      uriType: this.uriType,
      sellerFeeBasisPoints: this.sellerFeeBasisPoints,
      collection: this.collection.toString(),
      creators: this.creators.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: ShortMetadataArgsJSON): ShortMetadataArgs {
    return new ShortMetadataArgs({
      name: obj.name,
      uri: obj.uri,
      uriType: obj.uriType,
      sellerFeeBasisPoints: obj.sellerFeeBasisPoints,
      collection: new PublicKey(obj.collection),
      creators: obj.creators.map((item) => types.ShortCreator.fromJSON(item)),
    })
  }

  toEncodable() {
    return ShortMetadataArgs.toEncodable(this)
  }
}
