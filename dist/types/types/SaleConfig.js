import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class SaleConfig {
    constructor(fields) {
        this.prices = fields.prices.map((item) => new types.Price(Object.assign({}, item)));
        this.priceType = fields.priceType;
        this.rules = fields.rules;
        this.sendToVault = fields.sendToVault;
        this.saleType = fields.saleType;
    }
    static layout(property) {
        return borsh.struct([
            borsh.vec(types.Price.layout(), "prices"),
            types.PriceRule.layout("priceType"),
            borsh.vec(types.Rule.layout(), "rules"),
            borsh.u8("sendToVault"),
            types.SaleType.layout("saleType"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SaleConfig({
            prices: obj.prices.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.Price.fromDecoded(item)),
            priceType: types.PriceRule.fromDecoded(obj.priceType),
            rules: obj.rules.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.Rule.fromDecoded(item)),
            sendToVault: obj.sendToVault,
            saleType: types.SaleType.fromDecoded(obj.saleType),
        });
    }
    static toEncodable(fields) {
        return {
            prices: fields.prices.map((item) => types.Price.toEncodable(item)),
            priceType: fields.priceType.toEncodable(),
            rules: fields.rules.map((item) => item.toEncodable()),
            sendToVault: fields.sendToVault,
            saleType: fields.saleType.toEncodable(),
        };
    }
    toJSON() {
        return {
            prices: this.prices.map((item) => item.toJSON()),
            priceType: this.priceType.toJSON(),
            rules: this.rules.map((item) => item.toJSON()),
            sendToVault: this.sendToVault,
            saleType: this.saleType.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new SaleConfig({
            prices: obj.prices.map((item) => types.Price.fromJSON(item)),
            priceType: types.PriceRule.fromJSON(obj.priceType),
            rules: obj.rules.map((item) => types.Rule.fromJSON(item)),
            sendToVault: obj.sendToVault,
            saleType: types.SaleType.fromJSON(obj.saleType),
        });
    }
    toEncodable() {
        return SaleConfig.toEncodable(this);
    }
}
