import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SingleBuyV1JSON {
  kind: "SingleBuyV1"
}

export class SingleBuyV1 {
  static readonly discriminator = 0
  static readonly kind = "SingleBuyV1"
  readonly discriminator = 0
  readonly kind = "SingleBuyV1"

  toJSON(): SingleBuyV1JSON {
    return {
      kind: "SingleBuyV1",
    }
  }

  toEncodable() {
    return {
      SingleBuyV1: {},
    }
  }
}

export interface PackBuyV1JSON {
  kind: "PackBuyV1"
}

export class PackBuyV1 {
  static readonly discriminator = 1
  static readonly kind = "PackBuyV1"
  readonly discriminator = 1
  readonly kind = "PackBuyV1"

  toJSON(): PackBuyV1JSON {
    return {
      kind: "PackBuyV1",
    }
  }

  toEncodable() {
    return {
      PackBuyV1: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.BuyHistoryClassKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("SingleBuyV1" in obj) {
    return new SingleBuyV1()
  }
  if ("PackBuyV1" in obj) {
    return new PackBuyV1()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.BuyHistoryClassJSON
): types.BuyHistoryClassKind {
  switch (obj.kind) {
    case "SingleBuyV1": {
      return new SingleBuyV1()
    }
    case "PackBuyV1": {
      return new PackBuyV1()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "SingleBuyV1"),
    borsh.struct([], "PackBuyV1"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
