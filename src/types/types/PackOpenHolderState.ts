import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UnclaimedJSON {
  kind: "Unclaimed"
}

export class Unclaimed {
  static readonly discriminator = 0
  static readonly kind = "Unclaimed"
  readonly discriminator = 0
  readonly kind = "Unclaimed"

  toJSON(): UnclaimedJSON {
    return {
      kind: "Unclaimed",
    }
  }

  toEncodable() {
    return {
      Unclaimed: {},
    }
  }
}

export interface ClaimingJSON {
  kind: "Claiming"
}

export class Claiming {
  static readonly discriminator = 1
  static readonly kind = "Claiming"
  readonly discriminator = 1
  readonly kind = "Claiming"

  toJSON(): ClaimingJSON {
    return {
      kind: "Claiming",
    }
  }

  toEncodable() {
    return {
      Claiming: {},
    }
  }
}

export interface ClaimedJSON {
  kind: "Claimed"
}

export class Claimed {
  static readonly discriminator = 2
  static readonly kind = "Claimed"
  readonly discriminator = 2
  readonly kind = "Claimed"

  toJSON(): ClaimedJSON {
    return {
      kind: "Claimed",
    }
  }

  toEncodable() {
    return {
      Claimed: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.PackOpenHolderStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Unclaimed" in obj) {
    return new Unclaimed()
  }
  if ("Claiming" in obj) {
    return new Claiming()
  }
  if ("Claimed" in obj) {
    return new Claimed()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.PackOpenHolderStateJSON
): types.PackOpenHolderStateKind {
  switch (obj.kind) {
    case "Unclaimed": {
      return new Unclaimed()
    }
    case "Claiming": {
      return new Claiming()
    }
    case "Claimed": {
      return new Claimed()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Unclaimed"),
    borsh.struct([], "Claiming"),
    borsh.struct([], "Claimed"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
