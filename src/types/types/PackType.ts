import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RandomDirectJSON {
  kind: "RandomDirect"
}

export class RandomDirect {
  static readonly discriminator = 0
  static readonly kind = "RandomDirect"
  readonly discriminator = 0
  readonly kind = "RandomDirect"

  toJSON(): RandomDirectJSON {
    return {
      kind: "RandomDirect",
    }
  }

  toEncodable() {
    return {
      RandomDirect: {},
    }
  }
}

export interface RandomPackJSON {
  kind: "RandomPack"
}

export class RandomPack {
  static readonly discriminator = 1
  static readonly kind = "RandomPack"
  readonly discriminator = 1
  readonly kind = "RandomPack"

  toJSON(): RandomPackJSON {
    return {
      kind: "RandomPack",
    }
  }

  toEncodable() {
    return {
      RandomPack: {},
    }
  }
}

export interface BundleJSON {
  kind: "Bundle"
}

export class Bundle {
  static readonly discriminator = 2
  static readonly kind = "Bundle"
  readonly discriminator = 2
  readonly kind = "Bundle"

  toJSON(): BundleJSON {
    return {
      kind: "Bundle",
    }
  }

  toEncodable() {
    return {
      Bundle: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.PackTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("RandomDirect" in obj) {
    return new RandomDirect()
  }
  if ("RandomPack" in obj) {
    return new RandomPack()
  }
  if ("Bundle" in obj) {
    return new Bundle()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.PackTypeJSON): types.PackTypeKind {
  switch (obj.kind) {
    case "RandomDirect": {
      return new RandomDirect()
    }
    case "RandomPack": {
      return new RandomPack()
    }
    case "Bundle": {
      return new Bundle()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "RandomDirect"),
    borsh.struct([], "RandomPack"),
    borsh.struct([], "Bundle"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
