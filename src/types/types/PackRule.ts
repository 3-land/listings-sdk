import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export type CoolDownToOpenFields = {
  seconds: number
}
export type CoolDownToOpenValue = {
  seconds: number
}

export interface CoolDownToOpenJSON {
  kind: "CoolDownToOpen"
  value: {
    seconds: number
  }
}

export class CoolDownToOpen {
  static readonly discriminator = 0
  static readonly kind = "CoolDownToOpen"
  readonly discriminator = 0
  readonly kind = "CoolDownToOpen"
  readonly value: CoolDownToOpenValue

  constructor(value: CoolDownToOpenFields) {
    this.value = {
      seconds: value.seconds,
    }
  }

  toJSON(): CoolDownToOpenJSON {
    return {
      kind: "CoolDownToOpen",
      value: {
        seconds: this.value.seconds,
      },
    }
  }

  toEncodable() {
    return {
      CoolDownToOpen: {
        seconds: this.value.seconds,
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.PackRuleKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("CoolDownToOpen" in obj) {
    const val = obj["CoolDownToOpen"]
    return new CoolDownToOpen({
      seconds: val["seconds"],
    })
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.PackRuleJSON): types.PackRuleKind {
  switch (obj.kind) {
    case "CoolDownToOpen": {
      return new CoolDownToOpen({
        seconds: obj.value.seconds,
      })
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([borsh.u32("seconds")], "CoolDownToOpen"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
