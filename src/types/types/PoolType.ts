import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NoneJSON {
  kind: "None"
}

export class None {
  static readonly discriminator = 0
  static readonly kind = "None"
  readonly discriminator = 0
  readonly kind = "None"

  toJSON(): NoneJSON {
    return {
      kind: "None",
    }
  }

  toEncodable() {
    return {
      None: {},
    }
  }
}

export interface TokenJSON {
  kind: "Token"
}

export class Token {
  static readonly discriminator = 1
  static readonly kind = "Token"
  readonly discriminator = 1
  readonly kind = "Token"

  toJSON(): TokenJSON {
    return {
      kind: "Token",
    }
  }

  toEncodable() {
    return {
      Token: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.PoolTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("None" in obj) {
    return new None()
  }
  if ("Token" in obj) {
    return new Token()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.PoolTypeJSON): types.PoolTypeKind {
  switch (obj.kind) {
    case "None": {
      return new None()
    }
    case "Token": {
      return new Token()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "None"),
    borsh.struct([], "Token"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
