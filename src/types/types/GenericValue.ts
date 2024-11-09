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

export type KeyFields = {
  value: PublicKey
}
export type KeyValue = {
  value: PublicKey
}

export interface KeyJSON {
  kind: "Key"
  value: {
    value: string
  }
}

export class Key {
  static readonly discriminator = 1
  static readonly kind = "Key"
  readonly discriminator = 1
  readonly kind = "Key"
  readonly value: KeyValue

  constructor(value: KeyFields) {
    this.value = {
      value: value.value,
    }
  }

  toJSON(): KeyJSON {
    return {
      kind: "Key",
      value: {
        value: this.value.value.toString(),
      },
    }
  }

  toEncodable() {
    return {
      Key: {
        value: this.value.value,
      },
    }
  }
}

export type EightBytesFields = {
  value: BN
}
export type EightBytesValue = {
  value: BN
}

export interface EightBytesJSON {
  kind: "EightBytes"
  value: {
    value: string
  }
}

export class EightBytes {
  static readonly discriminator = 2
  static readonly kind = "EightBytes"
  readonly discriminator = 2
  readonly kind = "EightBytes"
  readonly value: EightBytesValue

  constructor(value: EightBytesFields) {
    this.value = {
      value: value.value,
    }
  }

  toJSON(): EightBytesJSON {
    return {
      kind: "EightBytes",
      value: {
        value: this.value.value.toString(),
      },
    }
  }

  toEncodable() {
    return {
      EightBytes: {
        value: this.value.value,
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.GenericValueKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("None" in obj) {
    return new None()
  }
  if ("Key" in obj) {
    const val = obj["Key"]
    return new Key({
      value: val["value"],
    })
  }
  if ("EightBytes" in obj) {
    const val = obj["EightBytes"]
    return new EightBytes({
      value: val["value"],
    })
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.GenericValueJSON): types.GenericValueKind {
  switch (obj.kind) {
    case "None": {
      return new None()
    }
    case "Key": {
      return new Key({
        value: new PublicKey(obj.value.value),
      })
    }
    case "EightBytes": {
      return new EightBytes({
        value: new BN(obj.value.value),
      })
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "None"),
    borsh.struct([borsh.publicKey("value")], "Key"),
    borsh.struct([borsh.u64("value")], "EightBytes"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
