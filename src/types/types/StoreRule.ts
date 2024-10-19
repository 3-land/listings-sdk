import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export type ListingPerWalletFields = {
  config: types.ListingPerWalletArgsFields
}
export type ListingPerWalletValue = {
  config: types.ListingPerWalletArgs
}

export interface ListingPerWalletJSON {
  kind: "ListingPerWallet"
  value: {
    config: types.ListingPerWalletArgsJSON
  }
}

export class ListingPerWallet {
  static readonly discriminator = 0
  static readonly kind = "ListingPerWallet"
  readonly discriminator = 0
  readonly kind = "ListingPerWallet"
  readonly value: ListingPerWalletValue

  constructor(value: ListingPerWalletFields) {
    this.value = {
      config: new types.ListingPerWalletArgs({ ...value.config }),
    }
  }

  toJSON(): ListingPerWalletJSON {
    return {
      kind: "ListingPerWallet",
      value: {
        config: this.value.config.toJSON(),
      },
    }
  }

  toEncodable() {
    return {
      ListingPerWallet: {
        config: types.ListingPerWalletArgs.toEncodable(this.value.config),
      },
    }
  }
}

export type AllowedCurrencyFields = {
  config: types.CurrencyTypeKind
}
export type AllowedCurrencyValue = {
  config: types.CurrencyTypeKind
}

export interface AllowedCurrencyJSON {
  kind: "AllowedCurrency"
  value: {
    config: types.CurrencyTypeJSON
  }
}

export class AllowedCurrency {
  static readonly discriminator = 1
  static readonly kind = "AllowedCurrency"
  readonly discriminator = 1
  readonly kind = "AllowedCurrency"
  readonly value: AllowedCurrencyValue

  constructor(value: AllowedCurrencyFields) {
    this.value = {
      config: value.config,
    }
  }

  toJSON(): AllowedCurrencyJSON {
    return {
      kind: "AllowedCurrency",
      value: {
        config: this.value.config.toJSON(),
      },
    }
  }

  toEncodable() {
    return {
      AllowedCurrency: {
        config: this.value.config.toEncodable(),
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.StoreRuleKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("ListingPerWallet" in obj) {
    const val = obj["ListingPerWallet"]
    return new ListingPerWallet({
      config: types.ListingPerWalletArgs.fromDecoded(val["config"]),
    })
  }
  if ("AllowedCurrency" in obj) {
    const val = obj["AllowedCurrency"]
    return new AllowedCurrency({
      config: types.CurrencyType.fromDecoded(val["config"]),
    })
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.StoreRuleJSON): types.StoreRuleKind {
  switch (obj.kind) {
    case "ListingPerWallet": {
      return new ListingPerWallet({
        config: types.ListingPerWalletArgs.fromJSON(obj.value.config),
      })
    }
    case "AllowedCurrency": {
      return new AllowedCurrency({
        config: types.CurrencyType.fromJSON(obj.value.config),
      })
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct(
      [types.ListingPerWalletArgs.layout("config")],
      "ListingPerWallet"
    ),
    borsh.struct([types.CurrencyType.layout("config")], "AllowedCurrency"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
