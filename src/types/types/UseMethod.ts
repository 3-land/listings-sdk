import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface BurnJSON {
  kind: "Burn"
}

export class Burn {
  static readonly discriminator = 0
  static readonly kind = "Burn"
  readonly discriminator = 0
  readonly kind = "Burn"

  toJSON(): BurnJSON {
    return {
      kind: "Burn",
    }
  }

  toEncodable() {
    return {
      Burn: {},
    }
  }
}

export interface MultipleJSON {
  kind: "Multiple"
}

export class Multiple {
  static readonly discriminator = 1
  static readonly kind = "Multiple"
  readonly discriminator = 1
  readonly kind = "Multiple"

  toJSON(): MultipleJSON {
    return {
      kind: "Multiple",
    }
  }

  toEncodable() {
    return {
      Multiple: {},
    }
  }
}

export interface SingleJSON {
  kind: "Single"
}

export class Single {
  static readonly discriminator = 2
  static readonly kind = "Single"
  readonly discriminator = 2
  readonly kind = "Single"

  toJSON(): SingleJSON {
    return {
      kind: "Single",
    }
  }

  toEncodable() {
    return {
      Single: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.UseMethodKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Burn" in obj) {
    return new Burn()
  }
  if ("Multiple" in obj) {
    return new Multiple()
  }
  if ("Single" in obj) {
    return new Single()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.UseMethodJSON): types.UseMethodKind {
  switch (obj.kind) {
    case "Burn": {
      return new Burn()
    }
    case "Multiple": {
      return new Multiple()
    }
    case "Single": {
      return new Single()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Burn"),
    borsh.struct([], "Multiple"),
    borsh.struct([], "Single"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
