import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OriginalJSON {
  kind: "Original"
}

export class Original {
  static readonly discriminator = 0
  static readonly kind = "Original"
  readonly discriminator = 0
  readonly kind = "Original"

  toJSON(): OriginalJSON {
    return {
      kind: "Original",
    }
  }

  toEncodable() {
    return {
      Original: {},
    }
  }
}

export interface Token2022JSON {
  kind: "Token2022"
}

export class Token2022 {
  static readonly discriminator = 1
  static readonly kind = "Token2022"
  readonly discriminator = 1
  readonly kind = "Token2022"

  toJSON(): Token2022JSON {
    return {
      kind: "Token2022",
    }
  }

  toEncodable() {
    return {
      Token2022: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.TokenProgramVersionKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Original" in obj) {
    return new Original()
  }
  if ("Token2022" in obj) {
    return new Token2022()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.TokenProgramVersionJSON
): types.TokenProgramVersionKind {
  switch (obj.kind) {
    case "Original": {
      return new Original()
    }
    case "Token2022": {
      return new Token2022()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Original"),
    borsh.struct([], "Token2022"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
