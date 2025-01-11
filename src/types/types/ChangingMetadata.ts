import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ChangingMetadataFields {
  edition: BN
  name: string | null
  uri: string | null
  hashTraits: BN | null
  afterTraits: string | null
}

export interface ChangingMetadataJSON {
  edition: string
  name: string | null
  uri: string | null
  hashTraits: string | null
  afterTraits: string | null
}

export class ChangingMetadata {
  readonly edition: BN
  readonly name: string | null
  readonly uri: string | null
  readonly hashTraits: BN | null
  readonly afterTraits: string | null

  constructor(fields: ChangingMetadataFields) {
    this.edition = fields.edition
    this.name = fields.name
    this.uri = fields.uri
    this.hashTraits = fields.hashTraits
    this.afterTraits = fields.afterTraits
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("edition"),
        borsh.option(borsh.str(), "name"),
        borsh.option(borsh.str(), "uri"),
        borsh.option(borsh.u64(), "hashTraits"),
        borsh.option(borsh.str(), "afterTraits"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ChangingMetadata({
      edition: obj.edition,
      name: obj.name,
      uri: obj.uri,
      hashTraits: obj.hashTraits,
      afterTraits: obj.afterTraits,
    })
  }

  static toEncodable(fields: ChangingMetadataFields) {
    return {
      edition: fields.edition,
      name: fields.name,
      uri: fields.uri,
      hashTraits: fields.hashTraits,
      afterTraits: fields.afterTraits,
    }
  }

  toJSON(): ChangingMetadataJSON {
    return {
      edition: this.edition.toString(),
      name: this.name,
      uri: this.uri,
      hashTraits: (this.hashTraits && this.hashTraits.toString()) || null,
      afterTraits: this.afterTraits,
    }
  }

  static fromJSON(obj: ChangingMetadataJSON): ChangingMetadata {
    return new ChangingMetadata({
      edition: new BN(obj.edition),
      name: obj.name,
      uri: obj.uri,
      hashTraits: (obj.hashTraits && new BN(obj.hashTraits)) || null,
      afterTraits: obj.afterTraits,
    })
  }

  toEncodable() {
    return ChangingMetadata.toEncodable(this)
  }
}
