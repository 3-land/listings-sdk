import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export type SemiFungibleFields = {
  hash: BN
  count: number
  supply: BN
  total: BN
}
export type SemiFungibleValue = {
  hash: BN
  count: number
  supply: BN
  total: BN
}

export interface SemiFungibleJSON {
  kind: "SemiFungible"
  value: {
    hash: string
    count: number
    supply: string
    total: string
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
      count: value.count,
      supply: value.supply,
      total: value.total,
    }
  }

  toJSON(): SemiFungibleJSON {
    return {
      kind: "SemiFungible",
      value: {
        hash: this.value.hash.toString(),
        count: this.value.count,
        supply: this.value.supply.toString(),
        total: this.value.total.toString(),
      },
    }
  }

  toEncodable() {
    return {
      SemiFungible: {
        hash: this.value.hash,
        count: this.value.count,
        supply: this.value.supply,
        total: this.value.total,
      },
    }
  }
}

export type DateFields = {
  hash: BN
  count: number
  supply: BN
}
export type DateValue = {
  hash: BN
  count: number
  supply: BN
}

export interface DateJSON {
  kind: "Date"
  value: {
    hash: string
    count: number
    supply: string
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
      count: value.count,
      supply: value.supply,
    }
  }

  toJSON(): DateJSON {
    return {
      kind: "Date",
      value: {
        hash: this.value.hash.toString(),
        count: this.value.count,
        supply: this.value.supply.toString(),
      },
    }
  }

  toEncodable() {
    return {
      Date: {
        hash: this.value.hash,
        count: this.value.count,
        supply: this.value.supply,
      },
    }
  }
}

export type NonFungibleFields = {
  hash: BN
  values: Array<types.TraitValueFields>
}
export type NonFungibleValue = {
  hash: BN
  values: Array<types.TraitValue>
}

export interface NonFungibleJSON {
  kind: "NonFungible"
  value: {
    hash: string
    values: Array<types.TraitValueJSON>
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
      values: value.values.map((item) => new types.TraitValue({ ...item })),
    }
  }

  toJSON(): NonFungibleJSON {
    return {
      kind: "NonFungible",
      value: {
        hash: this.value.hash.toString(),
        values: this.value.values.map((item) => item.toJSON()),
      },
    }
  }

  toEncodable() {
    return {
      NonFungible: {
        hash: this.value.hash,
        values: this.value.values.map((item) =>
          types.TraitValue.toEncodable(item)
        ),
      },
    }
  }
}

export type DataFields = {
  hash: BN
  count: number
  supply: BN
}
export type DataValue = {
  hash: BN
  count: number
  supply: BN
}

export interface DataJSON {
  kind: "Data"
  value: {
    hash: string
    count: number
    supply: string
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
      count: value.count,
      supply: value.supply,
    }
  }

  toJSON(): DataJSON {
    return {
      kind: "Data",
      value: {
        hash: this.value.hash.toString(),
        count: this.value.count,
        supply: this.value.supply.toString(),
      },
    }
  }

  toEncodable() {
    return {
      Data: {
        hash: this.value.hash,
        count: this.value.count,
        supply: this.value.supply,
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.TraitTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("SemiFungible" in obj) {
    const val = obj["SemiFungible"]
    return new SemiFungible({
      hash: val["hash"],
      count: val["count"],
      supply: val["supply"],
      total: val["total"],
    })
  }
  if ("Date" in obj) {
    const val = obj["Date"]
    return new Date({
      hash: val["hash"],
      count: val["count"],
      supply: val["supply"],
    })
  }
  if ("NonFungible" in obj) {
    const val = obj["NonFungible"]
    return new NonFungible({
      hash: val["hash"],
      values: val["values"].map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.TraitValue.fromDecoded(item)
      ),
    })
  }
  if ("Data" in obj) {
    const val = obj["Data"]
    return new Data({
      hash: val["hash"],
      count: val["count"],
      supply: val["supply"],
    })
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.TraitTypeJSON): types.TraitTypeKind {
  switch (obj.kind) {
    case "SemiFungible": {
      return new SemiFungible({
        hash: new BN(obj.value.hash),
        count: obj.value.count,
        supply: new BN(obj.value.supply),
        total: new BN(obj.value.total),
      })
    }
    case "Date": {
      return new Date({
        hash: new BN(obj.value.hash),
        count: obj.value.count,
        supply: new BN(obj.value.supply),
      })
    }
    case "NonFungible": {
      return new NonFungible({
        hash: new BN(obj.value.hash),
        values: obj.value.values.map((item) => types.TraitValue.fromJSON(item)),
      })
    }
    case "Data": {
      return new Data({
        hash: new BN(obj.value.hash),
        count: obj.value.count,
        supply: new BN(obj.value.supply),
      })
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct(
      [
        borsh.u64("hash"),
        borsh.u32("count"),
        borsh.u64("supply"),
        borsh.u64("total"),
      ],
      "SemiFungible"
    ),
    borsh.struct(
      [borsh.u64("hash"), borsh.u32("count"), borsh.u64("supply")],
      "Date"
    ),
    borsh.struct(
      [borsh.u64("hash"), borsh.vec(types.TraitValue.layout(), "values")],
      "NonFungible"
    ),
    borsh.struct(
      [borsh.u64("hash"), borsh.u32("count"), borsh.u64("supply")],
      "Data"
    ),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
