import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export type SemiFungibleFields = {
  hash: BN
}
export type SemiFungibleValue = {
  hash: BN
}

export interface SemiFungibleJSON {
  kind: "SemiFungible"
  value: {
    hash: string
  }
}

export class SemiFungible {
  static readonly discriminator = 0
  static readonly kind = "SemiFungible"
  readonly discriminator = 0
  readonly kind = "SemiFungible"
  readonly value: SemiFungibleValue

  constructor(value: SemiFungibleFields) {
    this.value = {
      hash: value.hash,
    }
  }

  toJSON(): SemiFungibleJSON {
    return {
      kind: "SemiFungible",
      value: {
        hash: this.value.hash.toString(),
      },
    }
  }

  toEncodable() {
    return {
      SemiFungible: {
        hash: this.value.hash,
      },
    }
  }
}

export type DateFields = {
  hash: BN
}
export type DateValue = {
  hash: BN
}

export interface DateJSON {
  kind: "Date"
  value: {
    hash: string
  }
}

export class Date {
  static readonly discriminator = 1
  static readonly kind = "Date"
  readonly discriminator = 1
  readonly kind = "Date"
  readonly value: DateValue

  constructor(value: DateFields) {
    this.value = {
      hash: value.hash,
    }
  }

  toJSON(): DateJSON {
    return {
      kind: "Date",
      value: {
        hash: this.value.hash.toString(),
      },
    }
  }

  toEncodable() {
    return {
      Date: {
        hash: this.value.hash,
      },
    }
  }
}

export type NonFungibleFields = {
  hash: BN
  values: Array<BN>
}
export type NonFungibleValue = {
  hash: BN
  values: Array<BN>
}

export interface NonFungibleJSON {
  kind: "NonFungible"
  value: {
    hash: string
    values: Array<string>
  }
}

export class NonFungible {
  static readonly discriminator = 2
  static readonly kind = "NonFungible"
  readonly discriminator = 2
  readonly kind = "NonFungible"
  readonly value: NonFungibleValue

  constructor(value: NonFungibleFields) {
    this.value = {
      hash: value.hash,
      values: value.values,
    }
  }

  toJSON(): NonFungibleJSON {
    return {
      kind: "NonFungible",
      value: {
        hash: this.value.hash.toString(),
        values: this.value.values.map((item) => item.toString()),
      },
    }
  }

  toEncodable() {
    return {
      NonFungible: {
        hash: this.value.hash,
        values: this.value.values,
      },
    }
  }
}

export type DataFields = {
  hash: BN
}
export type DataValue = {
  hash: BN
}

export interface DataJSON {
  kind: "Data"
  value: {
    hash: string
  }
}

export class Data {
  static readonly discriminator = 3
  static readonly kind = "Data"
  readonly discriminator = 3
  readonly kind = "Data"
  readonly value: DataValue

  constructor(value: DataFields) {
    this.value = {
      hash: value.hash,
    }
  }

  toJSON(): DataJSON {
    return {
      kind: "Data",
      value: {
        hash: this.value.hash.toString(),
      },
    }
  }

  toEncodable() {
    return {
      Data: {
        hash: this.value.hash,
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.TraitInitKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("SemiFungible" in obj) {
    const val = obj["SemiFungible"]
    return new SemiFungible({
      hash: val["hash"],
    })
  }
  if ("Date" in obj) {
    const val = obj["Date"]
    return new Date({
      hash: val["hash"],
    })
  }
  if ("NonFungible" in obj) {
    const val = obj["NonFungible"]
    return new NonFungible({
      hash: val["hash"],
      values: val["values"],
    })
  }
  if ("Data" in obj) {
    const val = obj["Data"]
    return new Data({
      hash: val["hash"],
    })
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.TraitInitJSON): types.TraitInitKind {
  switch (obj.kind) {
    case "SemiFungible": {
      return new SemiFungible({
        hash: new BN(obj.value.hash),
      })
    }
    case "Date": {
      return new Date({
        hash: new BN(obj.value.hash),
      })
    }
    case "NonFungible": {
      return new NonFungible({
        hash: new BN(obj.value.hash),
        values: obj.value.values.map((item) => new BN(item)),
      })
    }
    case "Data": {
      return new Data({
        hash: new BN(obj.value.hash),
      })
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([borsh.u64("hash")], "SemiFungible"),
    borsh.struct([borsh.u64("hash")], "Date"),
    borsh.struct(
      [borsh.u64("hash"), borsh.vec(borsh.u64(), "values")],
      "NonFungible"
    ),
    borsh.struct([borsh.u64("hash")], "Data"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
