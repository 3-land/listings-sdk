import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface IPGateJSON {
  kind: "IPGate"
}

export class IPGate {
  static readonly discriminator = 0
  static readonly kind = "IPGate"
  readonly discriminator = 0
  readonly kind = "IPGate"

  toJSON(): IPGateJSON {
    return {
      kind: "IPGate",
    }
  }

  toEncodable() {
    return {
      IPGate: {},
    }
  }
}

export interface BiometricsGateJSON {
  kind: "BiometricsGate"
}

export class BiometricsGate {
  static readonly discriminator = 1
  static readonly kind = "BiometricsGate"
  readonly discriminator = 1
  readonly kind = "BiometricsGate"

  toJSON(): BiometricsGateJSON {
    return {
      kind: "BiometricsGate",
    }
  }

  toEncodable() {
    return {
      BiometricsGate: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.AuthorityGateTypesKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("IPGate" in obj) {
    return new IPGate()
  }
  if ("BiometricsGate" in obj) {
    return new BiometricsGate()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.AuthorityGateTypesJSON
): types.AuthorityGateTypesKind {
  switch (obj.kind) {
    case "IPGate": {
      return new IPGate()
    }
    case "BiometricsGate": {
      return new BiometricsGate()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "IPGate"),
    borsh.struct([], "BiometricsGate"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
