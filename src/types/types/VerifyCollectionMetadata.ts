import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface VerifyCollectionMetadataFields {
  name: string
  symbol: string
  uri: string
  royalty: number
  collection: number
  creators: Array<types.CreatorFields>
}

export interface VerifyCollectionMetadataJSON {
  name: string
  symbol: string
  uri: string
  royalty: number
  collection: number
  creators: Array<types.CreatorJSON>
}

export class VerifyCollectionMetadata {
  readonly name: string
  readonly symbol: string
  readonly uri: string
  readonly royalty: number
  readonly collection: number
  readonly creators: Array<types.Creator>

  constructor(fields: VerifyCollectionMetadataFields) {
    this.name = fields.name
    this.symbol = fields.symbol
    this.uri = fields.uri
    this.royalty = fields.royalty
    this.collection = fields.collection
    this.creators = fields.creators.map(
      (item) => new types.Creator({ ...item })
    )
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.str("name"),
        borsh.str("symbol"),
        borsh.str("uri"),
        borsh.u16("royalty"),
        borsh.u8("collection"),
        borsh.vec(types.Creator.layout(), "creators"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new VerifyCollectionMetadata({
      name: obj.name,
      symbol: obj.symbol,
      uri: obj.uri,
      royalty: obj.royalty,
      collection: obj.collection,
      creators: obj.creators.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.Creator.fromDecoded(item)
      ),
    })
  }

  static toEncodable(fields: VerifyCollectionMetadataFields) {
    return {
      name: fields.name,
      symbol: fields.symbol,
      uri: fields.uri,
      royalty: fields.royalty,
      collection: fields.collection,
      creators: fields.creators.map((item) => types.Creator.toEncodable(item)),
    }
  }

  toJSON(): VerifyCollectionMetadataJSON {
    return {
      name: this.name,
      symbol: this.symbol,
      uri: this.uri,
      royalty: this.royalty,
      collection: this.collection,
      creators: this.creators.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: VerifyCollectionMetadataJSON): VerifyCollectionMetadata {
    return new VerifyCollectionMetadata({
      name: obj.name,
      symbol: obj.symbol,
      uri: obj.uri,
      royalty: obj.royalty,
      collection: obj.collection,
      creators: obj.creators.map((item) => types.Creator.fromJSON(item)),
    })
  }

  toEncodable() {
    return VerifyCollectionMetadata.toEncodable(this)
  }
}
