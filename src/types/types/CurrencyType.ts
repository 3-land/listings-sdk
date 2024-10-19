import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NativeJSON {
  kind: "Native"
}

export class Native {
  static readonly discriminator = 0
  static readonly kind = "Native"
  readonly discriminator = 0
  readonly kind = "Native"

  toJSON(): NativeJSON {
    return {
      kind: "Native",
    }
  }

  toEncodable() {
    return {
      Native: {},
    }
  }
}

export type SplFields = {
  id: PublicKey
}
export type SplValue = {
  id: PublicKey
}

export interface SplJSON {
  kind: "Spl"
  value: {
    id: string
  }
}

export class Spl {
  static readonly discriminator = 1
  static readonly kind = "Spl"
  readonly discriminator = 1
  readonly kind = "Spl"
  readonly value: SplValue

  constructor(value: SplFields) {
    this.value = {
      id: value.id,
    }
  }

  toJSON(): SplJSON {
    return {
      kind: "Spl",
      value: {
        id: this.value.id.toString(),
      },
    }
  }

  toEncodable() {
    return {
      Spl: {
        id: this.value.id,
      },
    }
  }
}

export type CollectionFields = {
  id: PublicKey
}
export type CollectionValue = {
  id: PublicKey
}

export interface CollectionJSON {
  kind: "Collection"
  value: {
    id: string
  }
}

export class Collection {
  static readonly discriminator = 2
  static readonly kind = "Collection"
  readonly discriminator = 2
  readonly kind = "Collection"
  readonly value: CollectionValue

  constructor(value: CollectionFields) {
    this.value = {
      id: value.id,
    }
  }

  toJSON(): CollectionJSON {
    return {
      kind: "Collection",
      value: {
        id: this.value.id.toString(),
      },
    }
  }

  toEncodable() {
    return {
      Collection: {
        id: this.value.id,
      },
    }
  }
}

export type CreatorFields = {
  id: PublicKey
}
export type CreatorValue = {
  id: PublicKey
}

export interface CreatorJSON {
  kind: "Creator"
  value: {
    id: string
  }
}

export class Creator {
  static readonly discriminator = 3
  static readonly kind = "Creator"
  readonly discriminator = 3
  readonly kind = "Creator"
  readonly value: CreatorValue

  constructor(value: CreatorFields) {
    this.value = {
      id: value.id,
    }
  }

  toJSON(): CreatorJSON {
    return {
      kind: "Creator",
      value: {
        id: this.value.id.toString(),
      },
    }
  }

  toEncodable() {
    return {
      Creator: {
        id: this.value.id,
      },
    }
  }
}

export interface NoneJSON {
  kind: "None"
}

export class None {
  static readonly discriminator = 4
  static readonly kind = "None"
  readonly discriminator = 4
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.CurrencyTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Native" in obj) {
    return new Native()
  }
  if ("Spl" in obj) {
    const val = obj["Spl"]
    return new Spl({
      id: val["id"],
    })
  }
  if ("Collection" in obj) {
    const val = obj["Collection"]
    return new Collection({
      id: val["id"],
    })
  }
  if ("Creator" in obj) {
    const val = obj["Creator"]
    return new Creator({
      id: val["id"],
    })
  }
  if ("None" in obj) {
    return new None()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.CurrencyTypeJSON): types.CurrencyTypeKind {
  switch (obj.kind) {
    case "Native": {
      return new Native()
    }
    case "Spl": {
      return new Spl({
        id: new PublicKey(obj.value.id),
      })
    }
    case "Collection": {
      return new Collection({
        id: new PublicKey(obj.value.id),
      })
    }
    case "Creator": {
      return new Creator({
        id: new PublicKey(obj.value.id),
      })
    }
    case "None": {
      return new None()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Native"),
    borsh.struct([borsh.publicKey("id")], "Spl"),
    borsh.struct([borsh.publicKey("id")], "Collection"),
    borsh.struct([borsh.publicKey("id")], "Creator"),
    borsh.struct([], "None"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
