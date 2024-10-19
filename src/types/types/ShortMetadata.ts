import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ShortMetadataFields {
  index: number
  supply: BN | null
  traitHash: BN
  name: string
  arweave: string
  traitPass: types.TraitPassFields | null
  royalty: number | null
  creators: Array<types.ShortCreatorFields> | null
}

export interface ShortMetadataJSON {
  index: number
  supply: string | null
  traitHash: string
  name: string
  arweave: string
  traitPass: types.TraitPassJSON | null
  royalty: number | null
  creators: Array<types.ShortCreatorJSON> | null
}

export class ShortMetadata {
  readonly index: number
  readonly supply: BN | null
  readonly traitHash: BN
  readonly name: string
  readonly arweave: string
  readonly traitPass: types.TraitPass | null
  readonly royalty: number | null
  readonly creators: Array<types.ShortCreator> | null

  constructor(fields: ShortMetadataFields) {
    this.index = fields.index
    this.supply = fields.supply
    this.traitHash = fields.traitHash
    this.name = fields.name
    this.arweave = fields.arweave
    this.traitPass =
      (fields.traitPass && new types.TraitPass({ ...fields.traitPass })) || null
    this.royalty = fields.royalty
    this.creators =
      (fields.creators &&
        fields.creators.map((item) => new types.ShortCreator({ ...item }))) ||
      null
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u32("index"),
        borsh.option(borsh.u64(), "supply"),
        borsh.u64("traitHash"),
        borsh.str("name"),
        borsh.str("arweave"),
        borsh.option(types.TraitPass.layout(), "traitPass"),
        borsh.option(borsh.u16(), "royalty"),
        borsh.option(borsh.vec(types.ShortCreator.layout()), "creators"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ShortMetadata({
      index: obj.index,
      supply: obj.supply,
      traitHash: obj.traitHash,
      name: obj.name,
      arweave: obj.arweave,
      traitPass:
        (obj.traitPass && types.TraitPass.fromDecoded(obj.traitPass)) || null,
      royalty: obj.royalty,
      creators:
        (obj.creators &&
          obj.creators.map(
            (
              item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
            ) => types.ShortCreator.fromDecoded(item)
          )) ||
        null,
    })
  }

  static toEncodable(fields: ShortMetadataFields) {
    return {
      index: fields.index,
      supply: fields.supply,
      traitHash: fields.traitHash,
      name: fields.name,
      arweave: fields.arweave,
      traitPass:
        (fields.traitPass && types.TraitPass.toEncodable(fields.traitPass)) ||
        null,
      royalty: fields.royalty,
      creators:
        (fields.creators &&
          fields.creators.map((item) =>
            types.ShortCreator.toEncodable(item)
          )) ||
        null,
    }
  }

  toJSON(): ShortMetadataJSON {
    return {
      index: this.index,
      supply: (this.supply && this.supply.toString()) || null,
      traitHash: this.traitHash.toString(),
      name: this.name,
      arweave: this.arweave,
      traitPass: (this.traitPass && this.traitPass.toJSON()) || null,
      royalty: this.royalty,
      creators:
        (this.creators && this.creators.map((item) => item.toJSON())) || null,
    }
  }

  static fromJSON(obj: ShortMetadataJSON): ShortMetadata {
    return new ShortMetadata({
      index: obj.index,
      supply: (obj.supply && new BN(obj.supply)) || null,
      traitHash: new BN(obj.traitHash),
      name: obj.name,
      arweave: obj.arweave,
      traitPass:
        (obj.traitPass && types.TraitPass.fromJSON(obj.traitPass)) || null,
      royalty: obj.royalty,
      creators:
        (obj.creators &&
          obj.creators.map((item) => types.ShortCreator.fromJSON(item))) ||
        null,
    })
  }

  toEncodable() {
    return ShortMetadata.toEncodable(this)
  }
}
