import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MintingOutJSON {
  kind: "MintingOut"
}

export class MintingOut {
  static readonly discriminator = 0
  static readonly kind = "MintingOut"
  readonly discriminator = 0
  readonly kind = "MintingOut"

  toJSON(): MintingOutJSON {
    return {
      kind: "MintingOut",
    }
  }

  toEncodable() {
    return {
      MintingOut: {},
    }
  }
}

export type SupplyFields = {
  limit: number
}
export type SupplyValue = {
  limit: number
}

export interface SupplyJSON {
  kind: "Supply"
  value: {
    limit: number
  }
}

export class Supply {
  static readonly discriminator = 1
  static readonly kind = "Supply"
  readonly discriminator = 1
  readonly kind = "Supply"
  readonly value: SupplyValue

  constructor(value: SupplyFields) {
    this.value = {
      limit: value.limit,
    }
  }

  toJSON(): SupplyJSON {
    return {
      kind: "Supply",
      value: {
        limit: this.value.limit,
      },
    }
  }

  toEncodable() {
    return {
      Supply: {
        limit: this.value.limit,
      },
    }
  }
}

export type HoursFields = {
  hours: number
}
export type HoursValue = {
  hours: number
}

export interface HoursJSON {
  kind: "Hours"
  value: {
    hours: number
  }
}

export class Hours {
  static readonly discriminator = 2
  static readonly kind = "Hours"
  readonly discriminator = 2
  readonly kind = "Hours"
  readonly value: HoursValue

  constructor(value: HoursFields) {
    this.value = {
      hours: value.hours,
    }
  }

  toJSON(): HoursJSON {
    return {
      kind: "Hours",
      value: {
        hours: this.value.hours,
      },
    }
  }

  toEncodable() {
    return {
      Hours: {
        hours: this.value.hours,
      },
    }
  }
}

export interface SellingOutJSON {
  kind: "SellingOut"
}

export class SellingOut {
  static readonly discriminator = 3
  static readonly kind = "SellingOut"
  readonly discriminator = 3
  readonly kind = "SellingOut"

  toJSON(): SellingOutJSON {
    return {
      kind: "SellingOut",
    }
  }

  toEncodable() {
    return {
      SellingOut: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.ActionAfterKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("MintingOut" in obj) {
    return new MintingOut()
  }
  if ("Supply" in obj) {
    const val = obj["Supply"]
    return new Supply({
      limit: val["limit"],
    })
  }
  if ("Hours" in obj) {
    const val = obj["Hours"]
    return new Hours({
      hours: val["hours"],
    })
  }
  if ("SellingOut" in obj) {
    return new SellingOut()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.ActionAfterJSON): types.ActionAfterKind {
  switch (obj.kind) {
    case "MintingOut": {
      return new MintingOut()
    }
    case "Supply": {
      return new Supply({
        limit: obj.value.limit,
      })
    }
    case "Hours": {
      return new Hours({
        hours: obj.value.hours,
      })
    }
    case "SellingOut": {
      return new SellingOut()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "MintingOut"),
    borsh.struct([borsh.u32("limit")], "Supply"),
    borsh.struct([borsh.u16("hours")], "Hours"),
    borsh.struct([], "SellingOut"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
