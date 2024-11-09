import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NewJSON {
  kind: "New"
}

export class New {
  static readonly discriminator = 0
  static readonly kind = "New"
  readonly discriminator = 0
  readonly kind = "New"

  toJSON(): NewJSON {
    return {
      kind: "New",
    }
  }

  toEncodable() {
    return {
      New: {},
    }
  }
}

export interface ActiveJSON {
  kind: "Active"
}

export class Active {
  static readonly discriminator = 1
  static readonly kind = "Active"
  readonly discriminator = 1
  readonly kind = "Active"

  toJSON(): ActiveJSON {
    return {
      kind: "Active",
    }
  }

  toEncodable() {
    return {
      Active: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.TokenStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("New" in obj) {
    return new New()
  }
  if ("Active" in obj) {
    return new Active()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.TokenStateJSON): types.TokenStateKind {
  switch (obj.kind) {
    case "New": {
      return new New()
    }
    case "Active": {
      return new Active()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "New"),
    borsh.struct([], "Active"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
