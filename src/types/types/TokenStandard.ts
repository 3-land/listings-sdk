import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NonFungibleJSON {
  kind: "NonFungible"
}

export class NonFungible {
  static readonly discriminator = 0
  static readonly kind = "NonFungible"
  readonly discriminator = 0
  readonly kind = "NonFungible"

  toJSON(): NonFungibleJSON {
    return {
      kind: "NonFungible",
    }
  }

  toEncodable() {
    return {
      NonFungible: {},
    }
  }
}

export interface FungibleAssetJSON {
  kind: "FungibleAsset"
}

export class FungibleAsset {
  static readonly discriminator = 1
  static readonly kind = "FungibleAsset"
  readonly discriminator = 1
  readonly kind = "FungibleAsset"

  toJSON(): FungibleAssetJSON {
    return {
      kind: "FungibleAsset",
    }
  }

  toEncodable() {
    return {
      FungibleAsset: {},
    }
  }
}

export interface FungibleJSON {
  kind: "Fungible"
}

export class Fungible {
  static readonly discriminator = 2
  static readonly kind = "Fungible"
  readonly discriminator = 2
  readonly kind = "Fungible"

  toJSON(): FungibleJSON {
    return {
      kind: "Fungible",
    }
  }

  toEncodable() {
    return {
      Fungible: {},
    }
  }
}

export interface NonFungibleEditionJSON {
  kind: "NonFungibleEdition"
}

export class NonFungibleEdition {
  static readonly discriminator = 3
  static readonly kind = "NonFungibleEdition"
  readonly discriminator = 3
  readonly kind = "NonFungibleEdition"

  toJSON(): NonFungibleEditionJSON {
    return {
      kind: "NonFungibleEdition",
    }
  }

  toEncodable() {
    return {
      NonFungibleEdition: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.TokenStandardKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("NonFungible" in obj) {
    return new NonFungible()
  }
  if ("FungibleAsset" in obj) {
    return new FungibleAsset()
  }
  if ("Fungible" in obj) {
    return new Fungible()
  }
  if ("NonFungibleEdition" in obj) {
    return new NonFungibleEdition()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.TokenStandardJSON
): types.TokenStandardKind {
  switch (obj.kind) {
    case "NonFungible": {
      return new NonFungible()
    }
    case "FungibleAsset": {
      return new FungibleAsset()
    }
    case "Fungible": {
      return new Fungible()
    }
    case "NonFungibleEdition": {
      return new NonFungibleEdition()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "NonFungible"),
    borsh.struct([], "FungibleAsset"),
    borsh.struct([], "Fungible"),
    borsh.struct([], "NonFungibleEdition"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
