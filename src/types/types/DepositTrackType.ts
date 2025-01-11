import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CreatorJSON {
  kind: "Creator"
}

export class Creator {
  static readonly discriminator = 0
  static readonly kind = "Creator"
  readonly discriminator = 0
  readonly kind = "Creator"

  toJSON(): CreatorJSON {
    return {
      kind: "Creator",
    }
  }

  toEncodable() {
    return {
      Creator: {},
    }
  }
}

export interface PdaCreatorJSON {
  kind: "PdaCreator"
}

export class PdaCreator {
  static readonly discriminator = 1
  static readonly kind = "PdaCreator"
  readonly discriminator = 1
  readonly kind = "PdaCreator"

  toJSON(): PdaCreatorJSON {
    return {
      kind: "PdaCreator",
    }
  }

  toEncodable() {
    return {
      PdaCreator: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.DepositTrackTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Creator" in obj) {
    return new Creator()
  }
  if ("PdaCreator" in obj) {
    return new PdaCreator()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.DepositTrackTypeJSON
): types.DepositTrackTypeKind {
  switch (obj.kind) {
    case "Creator": {
      return new Creator()
    }
    case "PdaCreator": {
      return new PdaCreator()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Creator"),
    borsh.struct([], "PdaCreator"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
