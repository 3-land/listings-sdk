import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FakeVolumeTrackFields {
  key: PublicKey
  track: types.VolumeTrackFields
}

export interface FakeVolumeTrackJSON {
  key: string
  track: types.VolumeTrackJSON
}

export class FakeVolumeTrack {
  readonly key: PublicKey
  readonly track: types.VolumeTrack

  constructor(fields: FakeVolumeTrackFields) {
    this.key = fields.key
    this.track = new types.VolumeTrack({ ...fields.track })
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.publicKey("key"), types.VolumeTrack.layout("track")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FakeVolumeTrack({
      key: obj.key,
      track: types.VolumeTrack.fromDecoded(obj.track),
    })
  }

  static toEncodable(fields: FakeVolumeTrackFields) {
    return {
      key: fields.key,
      track: types.VolumeTrack.toEncodable(fields.track),
    }
  }

  toJSON(): FakeVolumeTrackJSON {
    return {
      key: this.key.toString(),
      track: this.track.toJSON(),
    }
  }

  static fromJSON(obj: FakeVolumeTrackJSON): FakeVolumeTrack {
    return new FakeVolumeTrack({
      key: new PublicKey(obj.key),
      track: types.VolumeTrack.fromJSON(obj.track),
    })
  }

  toEncodable() {
    return FakeVolumeTrack.toEncodable(this)
  }
}
