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

export interface BurningJSON {
  kind: "Burning"
}

export class Burning {
  static readonly discriminator = 1
  static readonly kind = "Burning"
  readonly discriminator = 1
  readonly kind = "Burning"

  toJSON(): BurningJSON {
    return {
      kind: "Burning",
    }
  }

  toEncodable() {
    return {
      Burning: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.DepositStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Available" in obj) {
    return new Available()
  }
  if ("Burning" in obj) {
    return new Burning()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.DepositStateJSON): types.DepositStateKind {
  switch (obj.kind) {
    case "Available": {
      return new Available()
    }
    case "Burning": {
      return new Burning()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Available"),
    borsh.struct([], "Burning"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
