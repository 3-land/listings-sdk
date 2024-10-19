import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface DepositTrackFields {
  depositTrackType: types.DepositTrackTypeKind
  depositState: types.DepositStateKind
}

export interface DepositTrackJSON {
  depositTrackType: types.DepositTrackTypeJSON
  depositState: types.DepositStateJSON
}

export class DepositTrack {
  readonly depositTrackType: types.DepositTrackTypeKind
  readonly depositState: types.DepositStateKind

  constructor(fields: DepositTrackFields) {
    this.depositTrackType = fields.depositTrackType
    this.depositState = fields.depositState
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        types.DepositTrackType.layout("depositTrackType"),
        types.DepositState.layout("depositState"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new DepositTrack({
      depositTrackType: types.DepositTrackType.fromDecoded(
        obj.depositTrackType
      ),
      depositState: types.DepositState.fromDecoded(obj.depositState),
    })
  }

  static toEncodable(fields: DepositTrackFields) {
    return {
      depositTrackType: fields.depositTrackType.toEncodable(),
      depositState: fields.depositState.toEncodable(),
    }
  }

  toJSON(): DepositTrackJSON {
    return {
      depositTrackType: this.depositTrackType.toJSON(),
      depositState: this.depositState.toJSON(),
    }
  }

  static fromJSON(obj: DepositTrackJSON): DepositTrack {
    return new DepositTrack({
      depositTrackType: types.DepositTrackType.fromJSON(obj.depositTrackType),
      depositState: types.DepositState.fromJSON(obj.depositState),
    })
  }

  toEncodable() {
    return DepositTrack.toEncodable(this)
  }
}
