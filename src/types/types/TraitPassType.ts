import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export type SemiFungibleFields = {
  typeId: number
  amount: BN
}
export type SemiFungibleValue = {
  typeId: number
  amount: BN
}

export interface SemiFungibleJSON {
  kind: "SemiFungible"
  value: {
    typeId: number
    amount: string
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
      typeId: value.typeId,
      amount: value.amount,
    }
  }

  toJSON(): SemiFungibleJSON {
    return {
      kind: "SemiFungible",
      value: {
        typeId: this.value.typeId,
        amount: this.value.amount.toString(),
      },
    }
  }

  toEncodable() {
    return {
      SemiFungible: {
        typeId: this.value.typeId,
        amount: this.value.amount,
      },
    }
  }
}

export type DateFields = {
  typeId: number
  date: number
}
export type DateValue = {
  typeId: number
  date: number
}

export interface DateJSON {
  kind: "Date"
  value: {
    typeId: number
    date: number
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
      typeId: value.typeId,
      date: value.date,
    }
  }

  toJSON(): DateJSON {
    return {
      kind: "Date",
      value: {
        typeId: this.value.typeId,
        date: this.value.date,
      },
    }
  }

  toEncodable() {
    return {
      Date: {
        typeId: this.value.typeId,
        date: this.value.date,
      },
    }
  }
}

export type NonFungibleFields = {
  typeId: number
  valueId: number
}
export type NonFungibleValue = {
  typeId: number
  valueId: number
}

export interface NonFungibleJSON {
  kind: "NonFungible"
  value: {
    typeId: number
    valueId: number
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
      typeId: value.typeId,
      valueId: value.valueId,
    }
  }

  toJSON(): NonFungibleJSON {
    return {
      kind: "NonFungible",
      value: {
        typeId: this.value.typeId,
        valueId: this.value.valueId,
      },
    }
  }

  toEncodable() {
    return {
      NonFungible: {
        typeId: this.value.typeId,
        valueId: this.value.valueId,
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.TraitPassTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("SemiFungible" in obj) {
    const val = obj["SemiFungible"]
    return new SemiFungible({
      typeId: val["typeId"],
      amount: val["amount"],
    })
  }
  if ("Date" in obj) {
    const val = obj["Date"]
    return new Date({
      typeId: val["typeId"],
      date: val["date"],
    })
  }
  if ("NonFungible" in obj) {
    const val = obj["NonFungible"]
    return new NonFungible({
      typeId: val["typeId"],
      valueId: val["valueId"],
    })
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.TraitPassTypeJSON
): types.TraitPassTypeKind {
  switch (obj.kind) {
    case "SemiFungible": {
      return new SemiFungible({
        typeId: obj.value.typeId,
        amount: new BN(obj.value.amount),
      })
    }
    case "Date": {
      return new Date({
        typeId: obj.value.typeId,
        date: obj.value.date,
      })
    }
    case "NonFungible": {
      return new NonFungible({
        typeId: obj.value.typeId,
        valueId: obj.value.valueId,
      })
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([borsh.u16("typeId"), borsh.u64("amount")], "SemiFungible"),
    borsh.struct([borsh.u16("typeId"), borsh.u32("date")], "Date"),
    borsh.struct([borsh.u16("typeId"), borsh.u16("valueId")], "NonFungible"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
