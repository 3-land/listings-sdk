import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CreatorJSON {
  kind: "Creator"
}

export class Creator {
  static readonly discriminator = 0
  static readonly kind = "Creator"
  readonly discriminator = 0
  readonly kind = "Creator"

  toJSON(): CreatorJSON {
    return {
      kind: "Creator",
    }
  }

  toEncodable() {
    return {
      Creator: {},
    }
  }
}

export interface PdaCreatorJSON {
  kind: "PdaCreator"
}

export class PdaCreator {
  static readonly discriminator = 1
  static readonly kind = "PdaCreator"
  readonly discriminator = 1
  readonly kind = "PdaCreator"

  toJSON(): PdaCreatorJSON {
    return {
      kind: "PdaCreator",
    }
  }

  toEncodable() {
    return {
      PdaCreator: {},
    }
  }
}

export interface CollectionJSON {
  kind: "Collection"
}

export class Collection {
  static readonly discriminator = 2
  static readonly kind = "Collection"
  readonly discriminator = 2
  readonly kind = "Collection"

  toJSON(): CollectionJSON {
    return {
      kind: "Collection",
    }
  }

  toEncodable() {
    return {
      Collection: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.DepositTrackTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Creator" in obj) {
    return new Creator()
  }
  if ("PdaCreator" in obj) {
    return new PdaCreator()
  }
  if ("Collection" in obj) {
    return new Collection()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.DepositTrackTypeJSON
): types.DepositTrackTypeKind {
  switch (obj.kind) {
    case "Creator": {
      return new Creator()
    }
    case "PdaCreator": {
      return new PdaCreator()
    }
    case "Collection": {
      return new Collection()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Creator"),
    borsh.struct([], "PdaCreator"),
    borsh.struct([], "Collection"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
