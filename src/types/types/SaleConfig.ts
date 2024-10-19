import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SaleConfigFields {
  prices: Array<types.PriceFields>
  priceType: types.PriceRuleKind
  rules: Array<types.RuleKind>
  sendToVault: number
  saleType: types.SaleTypeKind
}

export interface SaleConfigJSON {
  prices: Array<types.PriceJSON>
  priceType: types.PriceRuleJSON
  rules: Array<types.RuleJSON>
  sendToVault: number
  saleType: types.SaleTypeJSON
}

export class SaleConfig {
  readonly prices: Array<types.Price>
  readonly priceType: types.PriceRuleKind
  readonly rules: Array<types.RuleKind>
  readonly sendToVault: number
  readonly saleType: types.SaleTypeKind

  constructor(fields: SaleConfigFields) {
    this.prices = fields.prices.map((item) => new types.Price({ ...item }))
    this.priceType = fields.priceType
    this.rules = fields.rules
    this.sendToVault = fields.sendToVault
    this.saleType = fields.saleType
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.vec(types.Price.layout(), "prices"),
        types.PriceRule.layout("priceType"),
        borsh.vec(types.Rule.layout(), "rules"),
        borsh.u8("sendToVault"),
        types.SaleType.layout("saleType"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SaleConfig({
      prices: obj.prices.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.Price.fromDecoded(item)
      ),
      priceType: types.PriceRule.fromDecoded(obj.priceType),
      rules: obj.rules.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.Rule.fromDecoded(item)
      ),
      sendToVault: obj.sendToVault,
      saleType: types.SaleType.fromDecoded(obj.saleType),
    })
  }

  static toEncodable(fields: SaleConfigFields) {
    return {
      prices: fields.prices.map((item) => types.Price.toEncodable(item)),
      priceType: fields.priceType.toEncodable(),
      rules: fields.rules.map((item) => item.toEncodable()),
      sendToVault: fields.sendToVault,
      saleType: fields.saleType.toEncodable(),
    }
  }

  toJSON(): SaleConfigJSON {
    return {
      prices: this.prices.map((item) => item.toJSON()),
      priceType: this.priceType.toJSON(),
      rules: this.rules.map((item) => item.toJSON()),
      sendToVault: this.sendToVault,
      saleType: this.saleType.toJSON(),
    }
  }

  static fromJSON(obj: SaleConfigJSON): SaleConfig {
    return new SaleConfig({
      prices: obj.prices.map((item) => types.Price.fromJSON(item)),
      priceType: types.PriceRule.fromJSON(obj.priceType),
      rules: obj.rules.map((item) => types.Rule.fromJSON(item)),
      sendToVault: obj.sendToVault,
      saleType: types.SaleType.fromJSON(obj.saleType),
    })
  }

  toEncodable() {
    return SaleConfig.toEncodable(this)
  }
}
