import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface AvailableJSON {
  kind: "Available"
}

export class Available {
  static readonly discriminator = 0
  static readonly kind = "Available"
  readonly discriminator = 0
  readonly kind = "Available"

  toJSON(): AvailableJSON {
    return {
      kind: "Available",
    }
  }

  toEncodable() {
    return {
      Available: {},
    }
  }
}

export interface ClosedJSON {
  kind: "Closed"
}

export class Closed {
  static readonly discriminator = 1
  static readonly kind = "Closed"
  readonly discriminator = 1
  readonly kind = "Closed"

  toJSON(): ClosedJSON {
    return {
      kind: "Closed",
    }
  }

  toEncodable() {
    return {
      Closed: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.PoolStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Available" in obj) {
    return new Available()
  }
  if ("Closed" in obj) {
    return new Closed()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.PoolStateJSON): types.PoolStateKind {
  switch (obj.kind) {
    case "Available": {
      return new Available()
    }
    case "Closed": {
      return new Closed()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Available"),
    borsh.struct([], "Closed"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
