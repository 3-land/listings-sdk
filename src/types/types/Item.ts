import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ItemFields {
  metadata: types.MetadataArgsFields
}

export interface ItemJSON {
  metadata: types.MetadataArgsJSON
}

export class Item {
  readonly metadata: types.MetadataArgs

  constructor(fields: ItemFields) {
    this.metadata = new types.MetadataArgs({ ...fields.metadata })
  }

  static layout(property?: string) {
    return borsh.struct([types.MetadataArgs.layout("metadata")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Item({
      metadata: types.MetadataArgs.fromDecoded(obj.metadata),
    })
  }

  static toEncodable(fields: ItemFields) {
    return {
      metadata: types.MetadataArgs.toEncodable(fields.metadata),
    }
  }

  toJSON(): ItemJSON {
    return {
      metadata: this.metadata.toJSON(),
    }
  }

  static fromJSON(obj: ItemJSON): Item {
    return new Item({
      metadata: types.MetadataArgs.fromJSON(obj.metadata),
    })
  }

  toEncodable() {
    return Item.toEncodable(this)
  }
}
