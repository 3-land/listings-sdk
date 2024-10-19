import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface TightCardMetadataFields {
  traitHash: BN
  name: string
  arweave: string
  royalty: number
  chunkSize: number
  creators: Array<types.ShortCreatorFields>
  uploader: PublicKey | null
}

export interface TightCardMetadataJSON {
  traitHash: string
  name: string
  arweave: string
  royalty: number
  chunkSize: number
  creators: Array<types.ShortCreatorJSON>
  uploader: string | null
}

export class TightCardMetadata {
  readonly traitHash: BN
  readonly name: string
  readonly arweave: string
  readonly royalty: number
  readonly chunkSize: number
  readonly creators: Array<types.ShortCreator>
  readonly uploader: PublicKey | null

  constructor(fields: TightCardMetadataFields) {
    this.traitHash = fields.traitHash
    this.name = fields.name
    this.arweave = fields.arweave
    this.royalty = fields.royalty
    this.chunkSize = fields.chunkSize
    this.creators = fields.creators.map(
      (item) => new types.ShortCreator({ ...item })
    )
    this.uploader = fields.uploader
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("traitHash"),
        borsh.str("name"),
        borsh.str("arweave"),
        borsh.u16("royalty"),
        borsh.u8("chunkSize"),
        borsh.vec(types.ShortCreator.layout(), "creators"),
        borsh.option(borsh.publicKey(), "uploader"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new TightCardMetadata({
      traitHash: obj.traitHash,
      name: obj.name,
      arweave: obj.arweave,
      royalty: obj.royalty,
      chunkSize: obj.chunkSize,
      creators: obj.creators.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.ShortCreator.fromDecoded(item)
      ),
      uploader: obj.uploader,
    })
  }

  static toEncodable(fields: TightCardMetadataFields) {
    return {
      traitHash: fields.traitHash,
      name: fields.name,
      arweave: fields.arweave,
      royalty: fields.royalty,
      chunkSize: fields.chunkSize,
      creators: fields.creators.map((item) =>
        types.ShortCreator.toEncodable(item)
      ),
      uploader: fields.uploader,
    }
  }

  toJSON(): TightCardMetadataJSON {
    return {
      traitHash: this.traitHash.toString(),
      name: this.name,
      arweave: this.arweave,
      royalty: this.royalty,
      chunkSize: this.chunkSize,
      creators: this.creators.map((item) => item.toJSON()),
      uploader: (this.uploader && this.uploader.toString()) || null,
    }
  }

  static fromJSON(obj: TightCardMetadataJSON): TightCardMetadata {
    return new TightCardMetadata({
      traitHash: new BN(obj.traitHash),
      name: obj.name,
      arweave: obj.arweave,
      royalty: obj.royalty,
      chunkSize: obj.chunkSize,
      creators: obj.creators.map((item) => types.ShortCreator.fromJSON(item)),
      uploader: (obj.uploader && new PublicKey(obj.uploader)) || null,
    })
  }

  toEncodable() {
    return TightCardMetadata.toEncodable(this)
  }
}
