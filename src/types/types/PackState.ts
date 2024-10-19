import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ClosedJSON {
  kind: "Closed"
}

export class Closed {
  static readonly discriminator = 0
  static readonly kind = "Closed"
  readonly discriminator = 0
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

export interface OpenedJSON {
  kind: "Opened"
}

export class Opened {
  static readonly discriminator = 1
  static readonly kind = "Opened"
  readonly discriminator = 1
  readonly kind = "Opened"

  toJSON(): OpenedJSON {
    return {
      kind: "Opened",
    }
  }

  toEncodable() {
    return {
      Opened: {},
    }
  }
}

export interface UnassignedJSON {
  kind: "Unassigned"
}

export class Unassigned {
  static readonly discriminator = 2
  static readonly kind = "Unassigned"
  readonly discriminator = 2
  readonly kind = "Unassigned"

  toJSON(): UnassignedJSON {
    return {
      kind: "Unassigned",
    }
  }

  toEncodable() {
    return {
      Unassigned: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.PackStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Closed" in obj) {
    return new Closed()
  }
  if ("Opened" in obj) {
    return new Opened()
  }
  if ("Unassigned" in obj) {
    return new Unassigned()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.PackStateJSON): types.PackStateKind {
  switch (obj.kind) {
    case "Closed": {
      return new Closed()
    }
    case "Opened": {
      return new Opened()
    }
    case "Unassigned": {
      return new Unassigned()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Closed"),
    borsh.struct([], "Opened"),
    borsh.struct([], "Unassigned"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
