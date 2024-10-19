import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CollectionBurnJSON {
  kind: "CollectionBurn"
}

export class CollectionBurn {
  static readonly discriminator = 0
  static readonly kind = "CollectionBurn"
  readonly discriminator = 0
  readonly kind = "CollectionBurn"

  toJSON(): CollectionBurnJSON {
    return {
      kind: "CollectionBurn",
    }
  }

  toEncodable() {
    return {
      CollectionBurn: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.BurnTypeBurnKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("CollectionBurn" in obj) {
    return new CollectionBurn()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.BurnTypeBurnJSON): types.BurnTypeBurnKind {
  switch (obj.kind) {
    case "CollectionBurn": {
      return new CollectionBurn()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([borsh.struct([], "CollectionBurn")])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
