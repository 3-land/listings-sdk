import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CpiJSON {
  kind: "Cpi"
}

export class Cpi {
  static readonly discriminator = 0
  static readonly kind = "Cpi"
  readonly discriminator = 0
  readonly kind = "Cpi"

  toJSON(): CpiJSON {
    return {
      kind: "Cpi",
    }
  }

  toEncodable() {
    return {
      Cpi: {},
    }
  }
}

export interface PublicJSON {
  kind: "Public"
}

export class Public {
  static readonly discriminator = 1
  static readonly kind = "Public"
  readonly discriminator = 1
  readonly kind = "Public"

  toJSON(): PublicJSON {
    return {
      kind: "Public",
    }
  }

  toEncodable() {
    return {
      Public: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.PoolAccessKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Cpi" in obj) {
    return new Cpi()
  }
  if ("Public" in obj) {
    return new Public()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.PoolAccessJSON): types.PoolAccessKind {
  switch (obj.kind) {
    case "Cpi": {
      return new Cpi()
    }
    case "Public": {
      return new Public()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Cpi"),
    borsh.struct([], "Public"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
