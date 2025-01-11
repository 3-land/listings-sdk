import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export type UnlocksAfterFields = {
  rule: types.ActionAfterKind
}
export type UnlocksAfterValue = {
  rule: types.ActionAfterKind
}

export interface UnlocksAfterJSON {
  kind: "UnlocksAfter"
  value: {
    rule: types.ActionAfterJSON
  }
}

export class UnlocksAfter {
  static readonly discriminator = 0
  static readonly kind = "UnlocksAfter"
  readonly discriminator = 0
  readonly kind = "UnlocksAfter"
  readonly value: UnlocksAfterValue

  constructor(value: UnlocksAfterFields) {
    this.value = {
      rule: value.rule,
    }
  }

  toJSON(): UnlocksAfterJSON {
    return {
      kind: "UnlocksAfter",
      value: {
        rule: this.value.rule.toJSON(),
      },
    }
  }

  toEncodable() {
    return {
      UnlocksAfter: {
        rule: this.value.rule.toEncodable(),
      },
    }
  }
}

export type UnwrapsAfterFields = {
  rule: types.ActionAfterKind
}
export type UnwrapsAfterValue = {
  rule: types.ActionAfterKind
}

export interface UnwrapsAfterJSON {
  kind: "UnwrapsAfter"
  value: {
    rule: types.ActionAfterJSON
  }
}

export class UnwrapsAfter {
  static readonly discriminator = 1
  static readonly kind = "UnwrapsAfter"
  readonly discriminator = 1
  readonly kind = "UnwrapsAfter"
  readonly value: UnwrapsAfterValue

  constructor(value: UnwrapsAfterFields) {
    this.value = {
      rule: value.rule,
    }
  }

  toJSON(): UnwrapsAfterJSON {
    return {
      kind: "UnwrapsAfter",
      value: {
        rule: this.value.rule.toJSON(),
      },
    }
  }

  toEncodable() {
    return {
      UnwrapsAfter: {
        rule: this.value.rule.toEncodable(),
      },
    }
  }
}

export type WrappedSourceFields = {
  rule: types.WrappedSourceFields
}
export type WrappedSourceValue = {
  rule: types.WrappedSource
}

export interface WrappedSourceJSON {
  kind: "WrappedSource"
  value: {
    rule: types.WrappedSourceJSON
  }
}

export class WrappedSource {
  static readonly discriminator = 2
  static readonly kind = "WrappedSource"
  readonly discriminator = 2
  readonly kind = "WrappedSource"
  readonly value: WrappedSourceValue

  constructor(value: WrappedSourceFields) {
    this.value = {
      rule: new types.WrappedSource({ ...value.rule }),
    }
  }

  toJSON(): WrappedSourceJSON {
    return {
      kind: "WrappedSource",
      value: {
        rule: this.value.rule.toJSON(),
      },
    }
  }

  toEncodable() {
    return {
      WrappedSource: {
        rule: types.WrappedSource.toEncodable(this.value.rule),
      },
    }
  }
}

export type WrappedDestinyFields = {
  rule: types.WrappedDestinyFields
}
export type WrappedDestinyValue = {
  rule: types.WrappedDestiny
}

export interface WrappedDestinyJSON {
  kind: "WrappedDestiny"
  value: {
    rule: types.WrappedDestinyJSON
  }
}

export class WrappedDestiny {
  static readonly discriminator = 3
  static readonly kind = "WrappedDestiny"
  readonly discriminator = 3
  readonly kind = "WrappedDestiny"
  readonly value: WrappedDestinyValue

  constructor(value: WrappedDestinyFields) {
    this.value = {
      rule: new types.WrappedDestiny({ ...value.rule }),
    }
  }

  toJSON(): WrappedDestinyJSON {
    return {
      kind: "WrappedDestiny",
      value: {
        rule: this.value.rule.toJSON(),
      },
    }
  }

  toEncodable() {
    return {
      WrappedDestiny: {
        rule: types.WrappedDestiny.toEncodable(this.value.rule),
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.RuleKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("UnlocksAfter" in obj) {
    const val = obj["UnlocksAfter"]
    return new UnlocksAfter({
      rule: types.ActionAfter.fromDecoded(val["rule"]),
    })
  }
  if ("UnwrapsAfter" in obj) {
    const val = obj["UnwrapsAfter"]
    return new UnwrapsAfter({
      rule: types.ActionAfter.fromDecoded(val["rule"]),
    })
  }
  if ("WrappedSource" in obj) {
    const val = obj["WrappedSource"]
    return new WrappedSource({
      rule: types.WrappedSource.fromDecoded(val["rule"]),
    })
  }
  if ("WrappedDestiny" in obj) {
    const val = obj["WrappedDestiny"]
    return new WrappedDestiny({
      rule: types.WrappedDestiny.fromDecoded(val["rule"]),
    })
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.RuleJSON): types.RuleKind {
  switch (obj.kind) {
    case "UnlocksAfter": {
      return new UnlocksAfter({
        rule: types.ActionAfter.fromJSON(obj.value.rule),
      })
    }
    case "UnwrapsAfter": {
      return new UnwrapsAfter({
        rule: types.ActionAfter.fromJSON(obj.value.rule),
      })
    }
    case "WrappedSource": {
      return new WrappedSource({
        rule: types.WrappedSource.fromJSON(obj.value.rule),
      })
    }
    case "WrappedDestiny": {
      return new WrappedDestiny({
        rule: types.WrappedDestiny.fromJSON(obj.value.rule),
      })
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([types.ActionAfter.layout("rule")], "UnlocksAfter"),
    borsh.struct([types.ActionAfter.layout("rule")], "UnwrapsAfter"),
    borsh.struct([types.WrappedSource.layout("rule")], "WrappedSource"),
    borsh.struct([types.WrappedDestiny.layout("rule")], "WrappedDestiny"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
