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

export type RevealerFields = {
  random: number
}
export type RevealerValue = {
  random: number
}

export interface RevealerJSON {
  kind: "Revealer"
  value: {
    random: number
  }
}

export class Revealer {
  static readonly discriminator = 1
  static readonly kind = "Revealer"
  readonly discriminator = 1
  readonly kind = "Revealer"
  readonly value: RevealerValue

  constructor(value: RevealerFields) {
    this.value = {
      random: value.random,
    }
  }

  toJSON(): RevealerJSON {
    return {
      kind: "Revealer",
      value: {
        random: this.value.random,
      },
    }
  }

  toEncodable() {
    return {
      Revealer: {
        random: this.value.random,
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.ExtraParameterKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("None" in obj) {
    return new None()
  }
  if ("Revealer" in obj) {
    const val = obj["Revealer"]
    return new Revealer({
      random: val["random"],
    })
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.ExtraParameterJSON
): types.ExtraParameterKind {
  switch (obj.kind) {
    case "None": {
      return new None()
    }
    case "Revealer": {
      return new Revealer({
        random: obj.value.random,
      })
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "None"),
    borsh.struct([borsh.u16("random")], "Revealer"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
