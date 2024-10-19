import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NonPendingJSON {
  kind: "NonPending"
}

export class NonPending {
  static readonly discriminator = 0
  static readonly kind = "NonPending"
  readonly discriminator = 0
  readonly kind = "NonPending"

  toJSON(): NonPendingJSON {
    return {
      kind: "NonPending",
    }
  }

  toEncodable() {
    return {
      NonPending: {},
    }
  }
}

export interface PendingJSON {
  kind: "Pending"
}

export class Pending {
  static readonly discriminator = 1
  static readonly kind = "Pending"
  readonly discriminator = 1
  readonly kind = "Pending"

  toJSON(): PendingJSON {
    return {
      kind: "Pending",
    }
  }

  toEncodable() {
    return {
      Pending: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.BurnStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("NonPending" in obj) {
    return new NonPending()
  }
  if ("Pending" in obj) {
    return new Pending()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.BurnStateJSON): types.BurnStateKind {
  switch (obj.kind) {
    case "NonPending": {
      return new NonPending()
    }
    case "Pending": {
      return new Pending()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "NonPending"),
    borsh.struct([], "Pending"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
