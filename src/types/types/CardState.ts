import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ActiveJSON {
  kind: "Active"
}

export class Active {
  static readonly discriminator = 0
  static readonly kind = "Active"
  readonly discriminator = 0
  readonly kind = "Active"

  toJSON(): ActiveJSON {
    return {
      kind: "Active",
    }
  }

  toEncodable() {
    return {
      Active: {},
    }
  }
}

export interface HiddenJSON {
  kind: "Hidden"
}

export class Hidden {
  static readonly discriminator = 1
  static readonly kind = "Hidden"
  readonly discriminator = 1
  readonly kind = "Hidden"

  toJSON(): HiddenJSON {
    return {
      kind: "Hidden",
    }
  }

  toEncodable() {
    return {
      Hidden: {},
    }
  }
}

export interface InactiveJSON {
  kind: "Inactive"
}

export class Inactive {
  static readonly discriminator = 2
  static readonly kind = "Inactive"
  readonly discriminator = 2
  readonly kind = "Inactive"

  toJSON(): InactiveJSON {
    return {
      kind: "Inactive",
    }
  }

  toEncodable() {
    return {
      Inactive: {},
    }
  }
}

export interface RetiredJSON {
  kind: "Retired"
}

export class Retired {
  static readonly discriminator = 3
  static readonly kind = "Retired"
  readonly discriminator = 3
  readonly kind = "Retired"

  toJSON(): RetiredJSON {
    return {
      kind: "Retired",
    }
  }

  toEncodable() {
    return {
      Retired: {},
    }
  }
}

export interface SoldOutJSON {
  kind: "SoldOut"
}

export class SoldOut {
  static readonly discriminator = 4
  static readonly kind = "SoldOut"
  readonly discriminator = 4
  readonly kind = "SoldOut"

  toJSON(): SoldOutJSON {
    return {
      kind: "SoldOut",
    }
  }

  toEncodable() {
    return {
      SoldOut: {},
    }
  }
}

export interface NoneJSON {
  kind: "None"
}

export class None {
  static readonly discriminator = 5
  static readonly kind = "None"
  readonly discriminator = 5
  readonly kind = "None"

  toJSON(): NoneJSON {
    return {
      kind: "None",
    }
  }

  toEncodable() {
    return {
      None: {},
    }
  }
}

export interface NotReadyJSON {
  kind: "NotReady"
}

export class NotReady {
  static readonly discriminator = 6
  static readonly kind = "NotReady"
  readonly discriminator = 6
  readonly kind = "NotReady"

  toJSON(): NotReadyJSON {
    return {
      kind: "NotReady",
    }
  }

  toEncodable() {
    return {
      NotReady: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.CardStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Active" in obj) {
    return new Active()
  }
  if ("Hidden" in obj) {
    return new Hidden()
  }
  if ("Inactive" in obj) {
    return new Inactive()
  }
  if ("Retired" in obj) {
    return new Retired()
  }
  if ("SoldOut" in obj) {
    return new SoldOut()
  }
  if ("None" in obj) {
    return new None()
  }
  if ("NotReady" in obj) {
    return new NotReady()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.CardStateJSON): types.CardStateKind {
  switch (obj.kind) {
    case "Active": {
      return new Active()
    }
    case "Hidden": {
      return new Hidden()
    }
    case "Inactive": {
      return new Inactive()
    }
    case "Retired": {
      return new Retired()
    }
    case "SoldOut": {
      return new SoldOut()
    }
    case "None": {
      return new None()
    }
    case "NotReady": {
      return new NotReady()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Active"),
    borsh.struct([], "Hidden"),
    borsh.struct([], "Inactive"),
    borsh.struct([], "Retired"),
    borsh.struct([], "SoldOut"),
    borsh.struct([], "None"),
    borsh.struct([], "NotReady"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
