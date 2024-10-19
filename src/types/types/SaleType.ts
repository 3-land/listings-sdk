import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NormalJSON {
  kind: "Normal"
}

export class Normal {
  static readonly discriminator = 0
  static readonly kind = "Normal"
  readonly discriminator = 0
  readonly kind = "Normal"

  toJSON(): NormalJSON {
    return {
      kind: "Normal",
    }
  }

  toEncodable() {
    return {
      Normal: {},
    }
  }
}

export interface NoMarketFeeJSON {
  kind: "NoMarketFee"
}

export class NoMarketFee {
  static readonly discriminator = 1
  static readonly kind = "NoMarketFee"
  readonly discriminator = 1
  readonly kind = "NoMarketFee"

  toJSON(): NoMarketFeeJSON {
    return {
      kind: "NoMarketFee",
    }
  }

  toEncodable() {
    return {
      NoMarketFee: {},
    }
  }
}

export interface PartnershipJSON {
  kind: "Partnership"
}

export class Partnership {
  static readonly discriminator = 2
  static readonly kind = "Partnership"
  readonly discriminator = 2
  readonly kind = "Partnership"

  toJSON(): PartnershipJSON {
    return {
      kind: "Partnership",
    }
  }

  toEncodable() {
    return {
      Partnership: {},
    }
  }
}

export interface LocksInVaultJSON {
  kind: "LocksInVault"
}

export class LocksInVault {
  static readonly discriminator = 3
  static readonly kind = "LocksInVault"
  readonly discriminator = 3
  readonly kind = "LocksInVault"

  toJSON(): LocksInVaultJSON {
    return {
      kind: "LocksInVault",
    }
  }

  toEncodable() {
    return {
      LocksInVault: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.SaleTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Normal" in obj) {
    return new Normal()
  }
  if ("NoMarketFee" in obj) {
    return new NoMarketFee()
  }
  if ("Partnership" in obj) {
    return new Partnership()
  }
  if ("LocksInVault" in obj) {
    return new LocksInVault()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.SaleTypeJSON): types.SaleTypeKind {
  switch (obj.kind) {
    case "Normal": {
      return new Normal()
    }
    case "NoMarketFee": {
      return new NoMarketFee()
    }
    case "Partnership": {
      return new Partnership()
    }
    case "LocksInVault": {
      return new LocksInVault()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Normal"),
    borsh.struct([], "NoMarketFee"),
    borsh.struct([], "Partnership"),
    borsh.struct([], "LocksInVault"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
