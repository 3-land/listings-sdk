import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CardTrackFields {
  supply: number
  created: number
  state: types.CardStateKind
}

export interface CardTrackJSON {
  supply: number
  created: number
  state: types.CardStateJSON
}

export class CardTrack {
  readonly supply: number
  readonly created: number
  readonly state: types.CardStateKind

  constructor(fields: CardTrackFields) {
    this.supply = fields.supply
    this.created = fields.created
    this.state = fields.state
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u32("supply"),
        borsh.u32("created"),
        types.CardState.layout("state"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CardTrack({
      supply: obj.supply,
      created: obj.created,
      state: types.CardState.fromDecoded(obj.state),
    })
  }

  static toEncodable(fields: CardTrackFields) {
    return {
      supply: fields.supply,
      created: fields.created,
      state: fields.state.toEncodable(),
    }
  }

  toJSON(): CardTrackJSON {
    return {
      supply: this.supply,
      created: this.created,
      state: this.state.toJSON(),
    }
  }

  static fromJSON(obj: CardTrackJSON): CardTrack {
    return new CardTrack({
      supply: obj.supply,
      created: obj.created,
      state: types.CardState.fromJSON(obj.state),
    })
  }

  toEncodable() {
    return CardTrack.toEncodable(this)
  }
}
