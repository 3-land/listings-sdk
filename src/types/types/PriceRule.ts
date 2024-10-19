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

export interface AndJSON {
  kind: "And"
}

export class And {
  static readonly discriminator = 1
  static readonly kind = "And"
  readonly discriminator = 1
  readonly kind = "And"

  toJSON(): AndJSON {
    return {
      kind: "And",
    }
  }

  toEncodable() {
    return {
      And: {},
    }
  }
}

export interface OrJSON {
  kind: "Or"
}

export class Or {
  static readonly discriminator = 2
  static readonly kind = "Or"
  readonly discriminator = 2
  readonly kind = "Or"

  toJSON(): OrJSON {
    return {
      kind: "Or",
    }
  }

  toEncodable() {
    return {
      Or: {},
    }
  }
}

export type BondingLinearFields = {
  initial: BN
  rate: BN
  index: number
  max: number
  min: number
}
export type BondingLinearValue = {
  initial: BN
  rate: BN
  index: number
  max: number
  min: number
}

export interface BondingLinearJSON {
  kind: "BondingLinear"
  value: {
    initial: string
    rate: string
    index: number
    max: number
    min: number
  }
}

export class BondingLinear {
  static readonly discriminator = 3
  static readonly kind = "BondingLinear"
  readonly discriminator = 3
  readonly kind = "BondingLinear"
  readonly value: BondingLinearValue

  constructor(value: BondingLinearFields) {
    this.value = {
      initial: value.initial,
      rate: value.rate,
      index: value.index,
      max: value.max,
      min: value.min,
    }
  }

  toJSON(): BondingLinearJSON {
    return {
      kind: "BondingLinear",
      value: {
        initial: this.value.initial.toString(),
        rate: this.value.rate.toString(),
        index: this.value.index,
        max: this.value.max,
        min: this.value.min,
      },
    }
  }

  toEncodable() {
    return {
      BondingLinear: {
        initial: this.value.initial,
        rate: this.value.rate,
        index: this.value.index,
        max: this.value.max,
        min: this.value.min,
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.PriceRuleKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("None" in obj) {
    return new None()
  }
  if ("And" in obj) {
    return new And()
  }
  if ("Or" in obj) {
    return new Or()
  }
  if ("BondingLinear" in obj) {
    const val = obj["BondingLinear"]
    return new BondingLinear({
      initial: val["initial"],
      rate: val["rate"],
      index: val["index"],
      max: val["max"],
      min: val["min"],
    })
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.PriceRuleJSON): types.PriceRuleKind {
  switch (obj.kind) {
    case "None": {
      return new None()
    }
    case "And": {
      return new And()
    }
    case "Or": {
      return new Or()
    }
    case "BondingLinear": {
      return new BondingLinear({
        initial: new BN(obj.value.initial),
        rate: new BN(obj.value.rate),
        index: obj.value.index,
        max: obj.value.max,
        min: obj.value.min,
      })
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "None"),
    borsh.struct([], "And"),
    borsh.struct([], "Or"),
    borsh.struct(
      [
        borsh.u64("initial"),
        borsh.u64("rate"),
        borsh.u8("index"),
        borsh.u32("max"),
        borsh.u16("min"),
      ],
      "BondingLinear"
    ),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
