import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface BurnTrackFields {
  amount: number
  burnType: types.BurnTypeBurnKind
}

export interface BurnTrackJSON {
  amount: number
  burnType: types.BurnTypeBurnJSON
}

export class BurnTrack {
  readonly amount: number
  readonly burnType: types.BurnTypeBurnKind

  constructor(fields: BurnTrackFields) {
    this.amount = fields.amount
    this.burnType = fields.burnType
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u16("amount"), types.BurnTypeBurn.layout("burnType")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new BurnTrack({
      amount: obj.amount,
      burnType: types.BurnTypeBurn.fromDecoded(obj.burnType),
    })
  }

  static toEncodable(fields: BurnTrackFields) {
    return {
      amount: fields.amount,
      burnType: fields.burnType.toEncodable(),
    }
  }

  toJSON(): BurnTrackJSON {
    return {
      amount: this.amount,
      burnType: this.burnType.toJSON(),
    }
  }

  static fromJSON(obj: BurnTrackJSON): BurnTrack {
    return new BurnTrack({
      amount: obj.amount,
      burnType: types.BurnTypeBurn.fromJSON(obj.burnType),
    })
  }

  toEncodable() {
    return BurnTrack.toEncodable(this)
  }
}
