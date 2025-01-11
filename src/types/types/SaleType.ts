import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NormalJSON {
  kind: "Normal"
}

export class Normal {
  static readonly discriminator = 0
  static readonly kind = "Normal"
  readonly discriminator = 0
  readonly kind = "Normal"

  toJSON(): NormalJSON {
    return {
      kind: "Normal",
    }
  }

  toEncodable() {
    return {
      Normal: {},
    }
  }
}

export interface NoMarketFeeJSON {
  kind: "NoMarketFee"
}

export class NoMarketFee {
  static readonly discriminator = 1
  static readonly kind = "NoMarketFee"
  readonly discriminator = 1
  readonly kind = "NoMarketFee"

  toJSON(): NoMarketFeeJSON {
    return {
      kind: "NoMarketFee",
    }
  }

  toEncodable() {
    return {
      NoMarketFee: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.SaleTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Normal" in obj) {
    return new Normal()
  }
  if ("NoMarketFee" in obj) {
    return new NoMarketFee()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.SaleTypeJSON): types.SaleTypeKind {
  switch (obj.kind) {
    case "Normal": {
      return new Normal()
    }
    case "NoMarketFee": {
      return new NoMarketFee()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Normal"),
    borsh.struct([], "NoMarketFee"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
