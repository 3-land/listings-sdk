import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export type CreatorFields = {
  creators: Array<types.CreatorFields>
}
export type CreatorValue = {
  creators: Array<types.Creator>
}

export interface CreatorJSON {
  kind: "Creator"
  value: {
    creators: Array<types.CreatorJSON>
  }
}

export class Creator {
  static readonly discriminator = 0
  static readonly kind = "Creator"
  readonly discriminator = 0
  readonly kind = "Creator"
  readonly value: CreatorValue

  constructor(value: CreatorFields) {
    this.value = {
      creators: value.creators.map((item) => new types.Creator({ ...item })),
    }
  }

  toJSON(): CreatorJSON {
    return {
      kind: "Creator",
      value: {
        creators: this.value.creators.map((item) => item.toJSON()),
      },
    }
  }

  toEncodable() {
    return {
      Creator: {
        creators: this.value.creators.map((item) =>
          types.Creator.toEncodable(item)
        ),
      },
    }
  }
}

export type PdaCreatorFields = {
  creators: Array<types.CreatorFields>
  hasher: types.AccountHasherFields
}
export type PdaCreatorValue = {
  creators: Array<types.Creator>
  hasher: types.AccountHasher
}

export interface PdaCreatorJSON {
  kind: "PdaCreator"
  value: {
    creators: Array<types.CreatorJSON>
    hasher: types.AccountHasherJSON
  }
}

export class PdaCreator {
  static readonly discriminator = 1
  static readonly kind = "PdaCreator"
  readonly discriminator = 1
  readonly kind = "PdaCreator"
  readonly value: PdaCreatorValue

  constructor(value: PdaCreatorFields) {
    this.value = {
      creators: value.creators.map((item) => new types.Creator({ ...item })),
      hasher: new types.AccountHasher({ ...value.hasher }),
    }
  }

  toJSON(): PdaCreatorJSON {
    return {
      kind: "PdaCreator",
      value: {
        creators: this.value.creators.map((item) => item.toJSON()),
        hasher: this.value.hasher.toJSON(),
      },
    }
  }

  toEncodable() {
    return {
      PdaCreator: {
        creators: this.value.creators.map((item) =>
          types.Creator.toEncodable(item)
        ),
        hasher: types.AccountHasher.toEncodable(this.value.hasher),
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.DepositTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Creator" in obj) {
    const val = obj["Creator"]
    return new Creator({
      creators: val["creators"].map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.Creator.fromDecoded(item)
      ),
    })
  }
  if ("PdaCreator" in obj) {
    const val = obj["PdaCreator"]
    return new PdaCreator({
      creators: val["creators"].map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.Creator.fromDecoded(item)
      ),
      hasher: types.AccountHasher.fromDecoded(val["hasher"]),
    })
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.DepositTypeJSON): types.DepositTypeKind {
  switch (obj.kind) {
    case "Creator": {
      return new Creator({
        creators: obj.value.creators.map((item) =>
          types.Creator.fromJSON(item)
        ),
      })
    }
    case "PdaCreator": {
      return new PdaCreator({
        creators: obj.value.creators.map((item) =>
          types.Creator.fromJSON(item)
        ),
        hasher: types.AccountHasher.fromJSON(obj.value.hasher),
      })
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([borsh.vec(types.Creator.layout(), "creators")], "Creator"),
    borsh.struct(
      [
        borsh.vec(types.Creator.layout(), "creators"),
        types.AccountHasher.layout("hasher"),
      ],
      "PdaCreator"
    ),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
