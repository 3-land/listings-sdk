import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface BasicJSON {
  kind: "Basic"
}

export class Basic {
  static readonly discriminator = 0
  static readonly kind = "Basic"
  readonly discriminator = 0
  readonly kind = "Basic"

  toJSON(): BasicJSON {
    return {
      kind: "Basic",
    }
  }

  toEncodable() {
    return {
      Basic: {},
    }
  }
}

export interface OnlyUpJSON {
  kind: "OnlyUp"
}

export class OnlyUp {
  static readonly discriminator = 1
  static readonly kind = "OnlyUp"
  readonly discriminator = 1
  readonly kind = "OnlyUp"

  toJSON(): OnlyUpJSON {
    return {
      kind: "OnlyUp",
    }
  }

  toEncodable() {
    return {
      OnlyUp: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.TokenTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Basic" in obj) {
    return new Basic()
  }
  if ("OnlyUp" in obj) {
    return new OnlyUp()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.TokenTypeJSON): types.TokenTypeKind {
  switch (obj.kind) {
    case "Basic": {
      return new Basic()
    }
    case "OnlyUp": {
      return new OnlyUp()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Basic"),
    borsh.struct([], "OnlyUp"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
