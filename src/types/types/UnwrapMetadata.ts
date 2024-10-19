import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UnwrapMetadataFields {
  wrappedAmount: BN
  decimals: number
  traitHash: BN
  name: string
  arweave: string
  edition: number
  leafIndex: number
  cardIndex: number | null
  royalty: number
  creators: Array<types.ShortCreatorFields>
  bumps: Array<number>
}

export interface UnwrapMetadataJSON {
  wrappedAmount: string
  decimals: number
  traitHash: string
  name: string
  arweave: string
  edition: number
  leafIndex: number
  cardIndex: number | null
  royalty: number
  creators: Array<types.ShortCreatorJSON>
  bumps: Array<number>
}

export class UnwrapMetadata {
  readonly wrappedAmount: BN
  readonly decimals: number
  readonly traitHash: BN
  readonly name: string
  readonly arweave: string
  readonly edition: number
  readonly leafIndex: number
  readonly cardIndex: number | null
  readonly royalty: number
  readonly creators: Array<types.ShortCreator>
  readonly bumps: Array<number>

  constructor(fields: UnwrapMetadataFields) {
    this.wrappedAmount = fields.wrappedAmount
    this.decimals = fields.decimals
    this.traitHash = fields.traitHash
    this.name = fields.name
    this.arweave = fields.arweave
    this.edition = fields.edition
    this.leafIndex = fields.leafIndex
    this.cardIndex = fields.cardIndex
    this.royalty = fields.royalty
    this.creators = fields.creators.map(
      (item) => new types.ShortCreator({ ...item })
    )
    this.bumps = fields.bumps
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("wrappedAmount"),
        borsh.u8("decimals"),
        borsh.u64("traitHash"),
        borsh.str("name"),
        borsh.str("arweave"),
        borsh.u32("edition"),
        borsh.u32("leafIndex"),
        borsh.option(borsh.u32(), "cardIndex"),
        borsh.u16("royalty"),
        borsh.vec(types.ShortCreator.layout(), "creators"),
        borsh.array(borsh.u8(), 2, "bumps"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UnwrapMetadata({
      wrappedAmount: obj.wrappedAmount,
      decimals: obj.decimals,
      traitHash: obj.traitHash,
      name: obj.name,
      arweave: obj.arweave,
      edition: obj.edition,
      leafIndex: obj.leafIndex,
      cardIndex: obj.cardIndex,
      royalty: obj.royalty,
      creators: obj.creators.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.ShortCreator.fromDecoded(item)
      ),
      bumps: obj.bumps,
    })
  }

  static toEncodable(fields: UnwrapMetadataFields) {
    return {
      wrappedAmount: fields.wrappedAmount,
      decimals: fields.decimals,
      traitHash: fields.traitHash,
      name: fields.name,
      arweave: fields.arweave,
      edition: fields.edition,
      leafIndex: fields.leafIndex,
      cardIndex: fields.cardIndex,
      royalty: fields.royalty,
      creators: fields.creators.map((item) =>
        types.ShortCreator.toEncodable(item)
      ),
      bumps: fields.bumps,
    }
  }

  toJSON(): UnwrapMetadataJSON {
    return {
      wrappedAmount: this.wrappedAmount.toString(),
      decimals: this.decimals,
      traitHash: this.traitHash.toString(),
      name: this.name,
      arweave: this.arweave,
      edition: this.edition,
      leafIndex: this.leafIndex,
      cardIndex: this.cardIndex,
      royalty: this.royalty,
      creators: this.creators.map((item) => item.toJSON()),
      bumps: this.bumps,
    }
  }

  static fromJSON(obj: UnwrapMetadataJSON): UnwrapMetadata {
    return new UnwrapMetadata({
      wrappedAmount: new BN(obj.wrappedAmount),
      decimals: obj.decimals,
      traitHash: new BN(obj.traitHash),
      name: obj.name,
      arweave: obj.arweave,
      edition: obj.edition,
      leafIndex: obj.leafIndex,
      cardIndex: obj.cardIndex,
      royalty: obj.royalty,
      creators: obj.creators.map((item) => types.ShortCreator.fromJSON(item)),
      bumps: obj.bumps,
    })
  }

  toEncodable() {
    return UnwrapMetadata.toEncodable(this)
  }
}
