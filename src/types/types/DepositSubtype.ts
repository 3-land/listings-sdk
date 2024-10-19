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

export interface ThreeJSON {
  kind: "Three"
}

export class Three {
  static readonly discriminator = 1
  static readonly kind = "Three"
  readonly discriminator = 1
  readonly kind = "Three"

  toJSON(): ThreeJSON {
    return {
      kind: "Three",
    }
  }

  toEncodable() {
    return {
      Three: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.DepositSubtypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("None" in obj) {
    return new None()
  }
  if ("Three" in obj) {
    return new Three()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.DepositSubtypeJSON
): types.DepositSubtypeKind {
  switch (obj.kind) {
    case "None": {
      return new None()
    }
    case "Three": {
      return new Three()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "None"),
    borsh.struct([], "Three"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
