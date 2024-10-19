import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NewJSON {
  kind: "New"
}

export class New {
  static readonly discriminator = 0
  static readonly kind = "New"
  readonly discriminator = 0
  readonly kind = "New"

  toJSON(): NewJSON {
    return {
      kind: "New",
    }
  }

  toEncodable() {
    return {
      New: {},
    }
  }
}

export interface NoneJSON {
  kind: "None"
}

export class None {
  static readonly discriminator = 1
  static readonly kind = "None"
  readonly discriminator = 1
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

export interface FirstJSON {
  kind: "First"
}

export class First {
  static readonly discriminator = 2
  static readonly kind = "First"
  readonly discriminator = 2
  readonly kind = "First"

  toJSON(): FirstJSON {
    return {
      kind: "First",
    }
  }

  toEncodable() {
    return {
      First: {},
    }
  }
}

export interface TenJSON {
  kind: "Ten"
}

export class Ten {
  static readonly discriminator = 3
  static readonly kind = "Ten"
  readonly discriminator = 3
  readonly kind = "Ten"

  toJSON(): TenJSON {
    return {
      kind: "Ten",
    }
  }

  toEncodable() {
    return {
      Ten: {},
    }
  }
}

export interface TwentyFiveJSON {
  kind: "TwentyFive"
}

export class TwentyFive {
  static readonly discriminator = 4
  static readonly kind = "TwentyFive"
  readonly discriminator = 4
  readonly kind = "TwentyFive"

  toJSON(): TwentyFiveJSON {
    return {
      kind: "TwentyFive",
    }
  }

  toEncodable() {
    return {
      TwentyFive: {},
    }
  }
}

export interface HundredJSON {
  kind: "Hundred"
}

export class Hundred {
  static readonly discriminator = 5
  static readonly kind = "Hundred"
  readonly discriminator = 5
  readonly kind = "Hundred"

  toJSON(): HundredJSON {
    return {
      kind: "Hundred",
    }
  }

  toEncodable() {
    return {
      Hundred: {},
    }
  }
}

export interface ThousandJSON {
  kind: "Thousand"
}

export class Thousand {
  static readonly discriminator = 6
  static readonly kind = "Thousand"
  readonly discriminator = 6
  readonly kind = "Thousand"

  toJSON(): ThousandJSON {
    return {
      kind: "Thousand",
    }
  }

  toEncodable() {
    return {
      Thousand: {},
    }
  }
}

export interface TenThousandJSON {
  kind: "TenThousand"
}

export class TenThousand {
  static readonly discriminator = 7
  static readonly kind = "TenThousand"
  readonly discriminator = 7
  readonly kind = "TenThousand"

  toJSON(): TenThousandJSON {
    return {
      kind: "TenThousand",
    }
  }

  toEncodable() {
    return {
      TenThousand: {},
    }
  }
}

export interface HundredThousandJSON {
  kind: "HundredThousand"
}

export class HundredThousand {
  static readonly discriminator = 8
  static readonly kind = "HundredThousand"
  readonly discriminator = 8
  readonly kind = "HundredThousand"

  toJSON(): HundredThousandJSON {
    return {
      kind: "HundredThousand",
    }
  }

  toEncodable() {
    return {
      HundredThousand: {},
    }
  }
}

export interface MillionJSON {
  kind: "Million"
}

export class Million {
  static readonly discriminator = 9
  static readonly kind = "Million"
  readonly discriminator = 9
  readonly kind = "Million"

  toJSON(): MillionJSON {
    return {
      kind: "Million",
    }
  }

  toEncodable() {
    return {
      Million: {},
    }
  }
}

export interface TenMillionJSON {
  kind: "TenMillion"
}

export class TenMillion {
  static readonly discriminator = 10
  static readonly kind = "TenMillion"
  readonly discriminator = 10
  readonly kind = "TenMillion"

  toJSON(): TenMillionJSON {
    return {
      kind: "TenMillion",
    }
  }

  toEncodable() {
    return {
      TenMillion: {},
    }
  }
}

export interface HundredMillionJSON {
  kind: "HundredMillion"
}

export class HundredMillion {
  static readonly discriminator = 11
  static readonly kind = "HundredMillion"
  readonly discriminator = 11
  readonly kind = "HundredMillion"

  toJSON(): HundredMillionJSON {
    return {
      kind: "HundredMillion",
    }
  }

  toEncodable() {
    return {
      HundredMillion: {},
    }
  }
}

export interface BillionJSON {
  kind: "Billion"
}

export class Billion {
  static readonly discriminator = 12
  static readonly kind = "Billion"
  readonly discriminator = 12
  readonly kind = "Billion"

  toJSON(): BillionJSON {
    return {
      kind: "Billion",
    }
  }

  toEncodable() {
    return {
      Billion: {},
    }
  }
}

export interface TenBillionJSON {
  kind: "TenBillion"
}

export class TenBillion {
  static readonly discriminator = 13
  static readonly kind = "TenBillion"
  readonly discriminator = 13
  readonly kind = "TenBillion"

  toJSON(): TenBillionJSON {
    return {
      kind: "TenBillion",
    }
  }

  toEncodable() {
    return {
      TenBillion: {},
    }
  }
}

export interface HundrerBillionJSON {
  kind: "HundrerBillion"
}

export class HundrerBillion {
  static readonly discriminator = 14
  static readonly kind = "HundrerBillion"
  readonly discriminator = 14
  readonly kind = "HundrerBillion"

  toJSON(): HundrerBillionJSON {
    return {
      kind: "HundrerBillion",
    }
  }

  toEncodable() {
    return {
      HundrerBillion: {},
    }
  }
}

export interface TrillionJSON {
  kind: "Trillion"
}

export class Trillion {
  static readonly discriminator = 15
  static readonly kind = "Trillion"
  readonly discriminator = 15
  readonly kind = "Trillion"

  toJSON(): TrillionJSON {
    return {
      kind: "Trillion",
    }
  }

  toEncodable() {
    return {
      Trillion: {},
    }
  }
}

export interface TenTrillionJSON {
  kind: "TenTrillion"
}

export class TenTrillion {
  static readonly discriminator = 16
  static readonly kind = "TenTrillion"
  readonly discriminator = 16
  readonly kind = "TenTrillion"

  toJSON(): TenTrillionJSON {
    return {
      kind: "TenTrillion",
    }
  }

  toEncodable() {
    return {
      TenTrillion: {},
    }
  }
}

export interface HundredTrillionJSON {
  kind: "HundredTrillion"
}

export class HundredTrillion {
  static readonly discriminator = 17
  static readonly kind = "HundredTrillion"
  readonly discriminator = 17
  readonly kind = "HundredTrillion"

  toJSON(): HundredTrillionJSON {
    return {
      kind: "HundredTrillion",
    }
  }

  toEncodable() {
    return {
      HundredTrillion: {},
    }
  }
}

export interface HighestJSON {
  kind: "Highest"
}

export class Highest {
  static readonly discriminator = 18
  static readonly kind = "Highest"
  readonly discriminator = 18
  readonly kind = "Highest"

  toJSON(): HighestJSON {
    return {
      kind: "Highest",
    }
  }

  toEncodable() {
    return {
      Highest: {},
    }
  }
}

export interface BannedJSON {
  kind: "Banned"
}

export class Banned {
  static readonly discriminator = 19
  static readonly kind = "Banned"
  readonly discriminator = 19
  readonly kind = "Banned"

  toJSON(): BannedJSON {
    return {
      kind: "Banned",
    }
  }

  toEncodable() {
    return {
      Banned: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.PopularityStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("New" in obj) {
    return new New()
  }
  if ("None" in obj) {
    return new None()
  }
  if ("First" in obj) {
    return new First()
  }
  if ("Ten" in obj) {
    return new Ten()
  }
  if ("TwentyFive" in obj) {
    return new TwentyFive()
  }
  if ("Hundred" in obj) {
    return new Hundred()
  }
  if ("Thousand" in obj) {
    return new Thousand()
  }
  if ("TenThousand" in obj) {
    return new TenThousand()
  }
  if ("HundredThousand" in obj) {
    return new HundredThousand()
  }
  if ("Million" in obj) {
    return new Million()
  }
  if ("TenMillion" in obj) {
    return new TenMillion()
  }
  if ("HundredMillion" in obj) {
    return new HundredMillion()
  }
  if ("Billion" in obj) {
    return new Billion()
  }
  if ("TenBillion" in obj) {
    return new TenBillion()
  }
  if ("HundrerBillion" in obj) {
    return new HundrerBillion()
  }
  if ("Trillion" in obj) {
    return new Trillion()
  }
  if ("TenTrillion" in obj) {
    return new TenTrillion()
  }
  if ("HundredTrillion" in obj) {
    return new HundredTrillion()
  }
  if ("Highest" in obj) {
    return new Highest()
  }
  if ("Banned" in obj) {
    return new Banned()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.PopularityStateJSON
): types.PopularityStateKind {
  switch (obj.kind) {
    case "New": {
      return new New()
    }
    case "None": {
      return new None()
    }
    case "First": {
      return new First()
    }
    case "Ten": {
      return new Ten()
    }
    case "TwentyFive": {
      return new TwentyFive()
    }
    case "Hundred": {
      return new Hundred()
    }
    case "Thousand": {
      return new Thousand()
    }
    case "TenThousand": {
      return new TenThousand()
    }
    case "HundredThousand": {
      return new HundredThousand()
    }
    case "Million": {
      return new Million()
    }
    case "TenMillion": {
      return new TenMillion()
    }
    case "HundredMillion": {
      return new HundredMillion()
    }
    case "Billion": {
      return new Billion()
    }
    case "TenBillion": {
      return new TenBillion()
    }
    case "HundrerBillion": {
      return new HundrerBillion()
    }
    case "Trillion": {
      return new Trillion()
    }
    case "TenTrillion": {
      return new TenTrillion()
    }
    case "HundredTrillion": {
      return new HundredTrillion()
    }
    case "Highest": {
      return new Highest()
    }
    case "Banned": {
      return new Banned()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "New"),
    borsh.struct([], "None"),
    borsh.struct([], "First"),
    borsh.struct([], "Ten"),
    borsh.struct([], "TwentyFive"),
    borsh.struct([], "Hundred"),
    borsh.struct([], "Thousand"),
    borsh.struct([], "TenThousand"),
    borsh.struct([], "HundredThousand"),
    borsh.struct([], "Million"),
    borsh.struct([], "TenMillion"),
    borsh.struct([], "HundredMillion"),
    borsh.struct([], "Billion"),
    borsh.struct([], "TenBillion"),
    borsh.struct([], "HundrerBillion"),
    borsh.struct([], "Trillion"),
    borsh.struct([], "TenTrillion"),
    borsh.struct([], "HundredTrillion"),
    borsh.struct([], "Highest"),
    borsh.struct([], "Banned"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
