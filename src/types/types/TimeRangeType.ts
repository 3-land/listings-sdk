import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface BetweenHoursJSON {
  kind: "BetweenHours"
}

export class BetweenHours {
  static readonly discriminator = 0
  static readonly kind = "BetweenHours"
  readonly discriminator = 0
  readonly kind = "BetweenHours"

  toJSON(): BetweenHoursJSON {
    return {
      kind: "BetweenHours",
    }
  }

  toEncodable() {
    return {
      BetweenHours: {},
    }
  }
}

export interface BetweenDaysJSON {
  kind: "BetweenDays"
}

export class BetweenDays {
  static readonly discriminator = 1
  static readonly kind = "BetweenDays"
  readonly discriminator = 1
  readonly kind = "BetweenDays"

  toJSON(): BetweenDaysJSON {
    return {
      kind: "BetweenDays",
    }
  }

  toEncodable() {
    return {
      BetweenDays: {},
    }
  }
}

export interface BetweenHoursNegateJSON {
  kind: "BetweenHoursNegate"
}

export class BetweenHoursNegate {
  static readonly discriminator = 2
  static readonly kind = "BetweenHoursNegate"
  readonly discriminator = 2
  readonly kind = "BetweenHoursNegate"

  toJSON(): BetweenHoursNegateJSON {
    return {
      kind: "BetweenHoursNegate",
    }
  }

  toEncodable() {
    return {
      BetweenHoursNegate: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.TimeRangeTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("BetweenHours" in obj) {
    return new BetweenHours()
  }
  if ("BetweenDays" in obj) {
    return new BetweenDays()
  }
  if ("BetweenHoursNegate" in obj) {
    return new BetweenHoursNegate()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.TimeRangeTypeJSON
): types.TimeRangeTypeKind {
  switch (obj.kind) {
    case "BetweenHours": {
      return new BetweenHours()
    }
    case "BetweenDays": {
      return new BetweenDays()
    }
    case "BetweenHoursNegate": {
      return new BetweenHoursNegate()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "BetweenHours"),
    borsh.struct([], "BetweenDays"),
    borsh.struct([], "BetweenHoursNegate"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
