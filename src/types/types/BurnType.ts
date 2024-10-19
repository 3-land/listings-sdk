import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NoneJSON {
  kind: "None"
}

export class None {
  static readonly discriminator = 0
  static readonly kind = "None"
  readonly discriminator = 0
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

export interface InTXJSON {
  kind: "InTX"
}

export class InTX {
  static readonly discriminator = 1
  static readonly kind = "InTX"
  readonly discriminator = 1
  readonly kind = "InTX"

  toJSON(): InTXJSON {
    return {
      kind: "InTX",
    }
  }

  toEncodable() {
    return {
      InTX: {},
    }
  }
}

export interface ProgressedJSON {
  kind: "Progressed"
}

export class Progressed {
  static readonly discriminator = 2
  static readonly kind = "Progressed"
  readonly discriminator = 2
  readonly kind = "Progressed"

  toJSON(): ProgressedJSON {
    return {
      kind: "Progressed",
    }
  }

  toEncodable() {
    return {
      Progressed: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.BurnTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("None" in obj) {
    return new None()
  }
  if ("InTX" in obj) {
    return new InTX()
  }
  if ("Progressed" in obj) {
    return new Progressed()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.BurnTypeJSON): types.BurnTypeKind {
  switch (obj.kind) {
    case "None": {
      return new None()
    }
    case "InTX": {
      return new InTX()
    }
    case "Progressed": {
      return new Progressed()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "None"),
    borsh.struct([], "InTX"),
    borsh.struct([], "Progressed"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
