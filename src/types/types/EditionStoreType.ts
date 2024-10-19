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

export interface NameJSON {
  kind: "Name"
}

export class Name {
  static readonly discriminator = 1
  static readonly kind = "Name"
  readonly discriminator = 1
  readonly kind = "Name"

  toJSON(): NameJSON {
    return {
      kind: "Name",
    }
  }

  toEncodable() {
    return {
      Name: {},
    }
  }
}

export interface UrlJSON {
  kind: "Url"
}

export class Url {
  static readonly discriminator = 2
  static readonly kind = "Url"
  readonly discriminator = 2
  readonly kind = "Url"

  toJSON(): UrlJSON {
    return {
      kind: "Url",
    }
  }

  toEncodable() {
    return {
      Url: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.EditionStoreTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("None" in obj) {
    return new None()
  }
  if ("Name" in obj) {
    return new Name()
  }
  if ("Url" in obj) {
    return new Url()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.EditionStoreTypeJSON
): types.EditionStoreTypeKind {
  switch (obj.kind) {
    case "None": {
      return new None()
    }
    case "Name": {
      return new Name()
    }
    case "Url": {
      return new Url()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "None"),
    borsh.struct([], "Name"),
    borsh.struct([], "Url"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
