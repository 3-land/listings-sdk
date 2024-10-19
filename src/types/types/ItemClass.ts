import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SingleJSON {
  kind: "Single"
}

export class Single {
  static readonly discriminator = 0
  static readonly kind = "Single"
  readonly discriminator = 0
  readonly kind = "Single"

  toJSON(): SingleJSON {
    return {
      kind: "Single",
    }
  }

  toEncodable() {
    return {
      Single: {},
    }
  }
}

export interface PackJSON {
  kind: "Pack"
}

export class Pack {
  static readonly discriminator = 1
  static readonly kind = "Pack"
  readonly discriminator = 1
  readonly kind = "Pack"

  toJSON(): PackJSON {
    return {
      kind: "Pack",
    }
  }

  toEncodable() {
    return {
      Pack: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.ItemClassKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Single" in obj) {
    return new Single()
  }
  if ("Pack" in obj) {
    return new Pack()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.ItemClassJSON): types.ItemClassKind {
  switch (obj.kind) {
    case "Single": {
      return new Single()
    }
    case "Pack": {
      return new Pack()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Single"),
    borsh.struct([], "Pack"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
