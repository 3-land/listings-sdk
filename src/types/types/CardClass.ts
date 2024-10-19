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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.CardClassKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Normal" in obj) {
    return new Normal()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.CardClassJSON): types.CardClassKind {
  switch (obj.kind) {
    case "Normal": {
      return new Normal()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([borsh.struct([], "Normal")])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
