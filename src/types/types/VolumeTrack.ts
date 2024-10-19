import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface VolumeTrackFields {
  amount: BN
  pieces: BN
}

export interface VolumeTrackJSON {
  amount: string
  pieces: string
}

export class VolumeTrack {
  readonly amount: BN
  readonly pieces: BN

  constructor(fields: VolumeTrackFields) {
    this.amount = fields.amount
    this.pieces = fields.pieces
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("amount"), borsh.u64("pieces")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new VolumeTrack({
      amount: obj.amount,
      pieces: obj.pieces,
    })
  }

  static toEncodable(fields: VolumeTrackFields) {
    return {
      amount: fields.amount,
      pieces: fields.pieces,
    }
  }

  toJSON(): VolumeTrackJSON {
    return {
      amount: this.amount.toString(),
      pieces: this.pieces.toString(),
    }
  }

  static fromJSON(obj: VolumeTrackJSON): VolumeTrack {
    return new VolumeTrack({
      amount: new BN(obj.amount),
      pieces: new BN(obj.pieces),
    })
  }

  toEncodable() {
    return VolumeTrack.toEncodable(this)
  }
}
