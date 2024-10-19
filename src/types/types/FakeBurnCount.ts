import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FakeBurnCountFields {
  key: BN
  track: types.DepositTrackFields
}

export interface FakeBurnCountJSON {
  key: string
  track: types.DepositTrackJSON
}

export class FakeBurnCount {
  readonly key: BN
  readonly track: types.DepositTrack

  constructor(fields: FakeBurnCountFields) {
    this.key = fields.key
    this.track = new types.DepositTrack({ ...fields.track })
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u64("key"), types.DepositTrack.layout("track")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FakeBurnCount({
      key: obj.key,
      track: types.DepositTrack.fromDecoded(obj.track),
    })
  }

  static toEncodable(fields: FakeBurnCountFields) {
    return {
      key: fields.key,
      track: types.DepositTrack.toEncodable(fields.track),
    }
  }

  toJSON(): FakeBurnCountJSON {
    return {
      key: this.key.toString(),
      track: this.track.toJSON(),
    }
  }

  static fromJSON(obj: FakeBurnCountJSON): FakeBurnCount {
    return new FakeBurnCount({
      key: new BN(obj.key),
      track: types.DepositTrack.fromJSON(obj.track),
    })
  }

  toEncodable() {
    return FakeBurnCount.toEncodable(this)
  }
}
