import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NoTrackJSON {
  kind: "NoTrack"
}

export class NoTrack {
  static readonly discriminator = 0
  static readonly kind = "NoTrack"
  readonly discriminator = 0
  readonly kind = "NoTrack"

  toJSON(): NoTrackJSON {
    return {
      kind: "NoTrack",
    }
  }

  toEncodable() {
    return {
      NoTrack: {},
    }
  }
}

export interface TrackedJSON {
  kind: "Tracked"
}

export class Tracked {
  static readonly discriminator = 1
  static readonly kind = "Tracked"
  readonly discriminator = 1
  readonly kind = "Tracked"

  toJSON(): TrackedJSON {
    return {
      kind: "Tracked",
    }
  }

  toEncodable() {
    return {
      Tracked: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.TrackRegistryKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("NoTrack" in obj) {
    return new NoTrack()
  }
  if ("Tracked" in obj) {
    return new Tracked()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.TrackRegistryJSON
): types.TrackRegistryKind {
  switch (obj.kind) {
    case "NoTrack": {
      return new NoTrack()
    }
    case "Tracked": {
      return new Tracked()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "NoTrack"),
    borsh.struct([], "Tracked"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
