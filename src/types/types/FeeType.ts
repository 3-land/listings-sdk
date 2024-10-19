import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface AllMintsJSON {
  kind: "AllMints"
}

export class AllMints {
  static readonly discriminator = 0
  static readonly kind = "AllMints"
  readonly discriminator = 0
  readonly kind = "AllMints"

  toJSON(): AllMintsJSON {
    return {
      kind: "AllMints",
    }
  }

  toEncodable() {
    return {
      AllMints: {},
    }
  }
}

export interface PricedMintsOnlyJSON {
  kind: "PricedMintsOnly"
}

export class PricedMintsOnly {
  static readonly discriminator = 1
  static readonly kind = "PricedMintsOnly"
  readonly discriminator = 1
  readonly kind = "PricedMintsOnly"

  toJSON(): PricedMintsOnlyJSON {
    return {
      kind: "PricedMintsOnly",
    }
  }

  toEncodable() {
    return {
      PricedMintsOnly: {},
    }
  }
}

export interface SkipBurnMintsJSON {
  kind: "SkipBurnMints"
}

export class SkipBurnMints {
  static readonly discriminator = 2
  static readonly kind = "SkipBurnMints"
  readonly discriminator = 2
  readonly kind = "SkipBurnMints"

  toJSON(): SkipBurnMintsJSON {
    return {
      kind: "SkipBurnMints",
    }
  }

  toEncodable() {
    return {
      SkipBurnMints: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.FeeTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("AllMints" in obj) {
    return new AllMints()
  }
  if ("PricedMintsOnly" in obj) {
    return new PricedMintsOnly()
  }
  if ("SkipBurnMints" in obj) {
    return new SkipBurnMints()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.FeeTypeJSON): types.FeeTypeKind {
  switch (obj.kind) {
    case "AllMints": {
      return new AllMints()
    }
    case "PricedMintsOnly": {
      return new PricedMintsOnly()
    }
    case "SkipBurnMints": {
      return new SkipBurnMints()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "AllMints"),
    borsh.struct([], "PricedMintsOnly"),
    borsh.struct([], "SkipBurnMints"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
