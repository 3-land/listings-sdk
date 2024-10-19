import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ItemTrackFields {
  state: types.ItemStateKind
  supply: BN
  created: BN
}

export interface ItemTrackJSON {
  state: types.ItemStateJSON
  supply: string
  created: string
}

export class ItemTrack {
  readonly state: types.ItemStateKind
  readonly supply: BN
  readonly created: BN

  constructor(fields: ItemTrackFields) {
    this.state = fields.state
    this.supply = fields.supply
    this.created = fields.created
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        types.ItemState.layout("state"),
        borsh.u64("supply"),
        borsh.u64("created"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ItemTrack({
      state: types.ItemState.fromDecoded(obj.state),
      supply: obj.supply,
      created: obj.created,
    })
  }

  static toEncodable(fields: ItemTrackFields) {
    return {
      state: fields.state.toEncodable(),
      supply: fields.supply,
      created: fields.created,
    }
  }

  toJSON(): ItemTrackJSON {
    return {
      state: this.state.toJSON(),
      supply: this.supply.toString(),
      created: this.created.toString(),
    }
  }

  static fromJSON(obj: ItemTrackJSON): ItemTrack {
    return new ItemTrack({
      state: types.ItemState.fromJSON(obj.state),
      supply: new BN(obj.supply),
      created: new BN(obj.created),
    })
  }

  toEncodable() {
    return ItemTrack.toEncodable(this)
  }
}
