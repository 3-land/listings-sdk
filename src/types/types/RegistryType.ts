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

export type WrappedPoolFields = {
  poolHash: BN
}
export type WrappedPoolValue = {
  poolHash: BN
}

export interface WrappedPoolJSON {
  kind: "WrappedPool"
  value: {
    poolHash: string
  }
}

export class WrappedPool {
  static readonly discriminator = 1
  static readonly kind = "WrappedPool"
  readonly discriminator = 1
  readonly kind = "WrappedPool"
  readonly value: WrappedPoolValue

  constructor(value: WrappedPoolFields) {
    this.value = {
      poolHash: value.poolHash,
    }
  }

  toJSON(): WrappedPoolJSON {
    return {
      kind: "WrappedPool",
      value: {
        poolHash: this.value.poolHash.toString(),
      },
    }
  }

  toEncodable() {
    return {
      WrappedPool: {
        poolHash: this.value.poolHash,
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.RegistryTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("None" in obj) {
    return new None()
  }
  if ("WrappedPool" in obj) {
    const val = obj["WrappedPool"]
    return new WrappedPool({
      poolHash: val["poolHash"],
    })
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.RegistryTypeJSON): types.RegistryTypeKind {
  switch (obj.kind) {
    case "None": {
      return new None()
    }
    case "WrappedPool": {
      return new WrappedPool({
        poolHash: new BN(obj.value.poolHash),
      })
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "None"),
    borsh.struct([borsh.u64("poolHash")], "WrappedPool"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
