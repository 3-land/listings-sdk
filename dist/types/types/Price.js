import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class Price {
    constructor(fields) {
        this.amount = fields.amount;
        this.priceType = fields.priceType;
    }
    static layout(property) {
        return borsh.struct([borsh.u64("amount"), types.CurrencyType.layout("priceType")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Price({
            amount: obj.amount,
            priceType: types.CurrencyType.fromDecoded(obj.priceType),
        });
    }
    static toEncodable(fields) {
        return {
            amount: fields.amount,
            priceType: fields.priceType.toEncodable(),
        };
    }
    toJSON() {
        return {
            amount: this.amount.toString(),
            priceType: this.priceType.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new Price({
            amount: new BN(obj.amount),
            priceType: types.CurrencyType.fromJSON(obj.priceType),
        });
    }
    toEncodable() {
        return Price.toEncodable(this);
    }
}
