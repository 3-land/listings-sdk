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

export interface MultiTokenJSON {
  kind: "MultiToken"
}

export class MultiToken {
  static readonly discriminator = 2
  static readonly kind = "MultiToken"
  readonly discriminator = 2
  readonly kind = "MultiToken"

  toJSON(): MultiTokenJSON {
    return {
      kind: "MultiToken",
    }
  }

  toEncodable() {
    return {
      MultiToken: {},
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
  if ("MultiToken" in obj) {
    return new MultiToken()
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
    case "MultiToken": {
      return new MultiToken()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "None"),
    borsh.struct([], "Token"),
    borsh.struct([], "MultiToken"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
