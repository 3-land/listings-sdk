import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface PriceFields {
  amount: BN
  priceType: types.CurrencyTypeKind
}

export interface PriceJSON {
  amount: string
  priceType: types.CurrencyTypeJSON
}

export class Price {
  readonly amount: BN
  readonly priceType: types.CurrencyTypeKind

  constructor(fields: PriceFields) {
    this.amount = fields.amount
    this.priceType = fields.priceType
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u64("amount"), types.CurrencyType.layout("priceType")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Price({
      amount: obj.amount,
      priceType: types.CurrencyType.fromDecoded(obj.priceType),
    })
  }

  static toEncodable(fields: PriceFields) {
    return {
      amount: fields.amount,
      priceType: fields.priceType.toEncodable(),
    }
  }

  toJSON(): PriceJSON {
    return {
      amount: this.amount.toString(),
      priceType: this.priceType.toJSON(),
    }
  }

  static fromJSON(obj: PriceJSON): Price {
    return new Price({
      amount: new BN(obj.amount),
      priceType: types.CurrencyType.fromJSON(obj.priceType),
    })
  }

  toEncodable() {
    return Price.toEncodable(this)
  }
}
