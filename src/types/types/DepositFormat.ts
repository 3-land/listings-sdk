import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CnftJSON {
  kind: "Cnft"
}

export class Cnft {
  static readonly discriminator = 0
  static readonly kind = "Cnft"
  readonly discriminator = 0
  readonly kind = "Cnft"

  toJSON(): CnftJSON {
    return {
      kind: "Cnft",
    }
  }

  toEncodable() {
    return {
      Cnft: {},
    }
  }
}

export interface NftJSON {
  kind: "Nft"
}

export class Nft {
  static readonly discriminator = 1
  static readonly kind = "Nft"
  readonly discriminator = 1
  readonly kind = "Nft"

  toJSON(): NftJSON {
    return {
      kind: "Nft",
    }
  }

  toEncodable() {
    return {
      Nft: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.DepositFormatKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Cnft" in obj) {
    return new Cnft()
  }
  if ("Nft" in obj) {
    return new Nft()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.DepositFormatJSON
): types.DepositFormatKind {
  switch (obj.kind) {
    case "Cnft": {
      return new Cnft()
    }
    case "Nft": {
      return new Nft()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Cnft"),
    borsh.struct([], "Nft"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
