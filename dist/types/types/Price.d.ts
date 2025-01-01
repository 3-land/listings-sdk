import BN from "bn.js";
import * as types from "../types";
export interface PriceFields {
    amount: BN;
    priceType: types.CurrencyTypeKind;
}
export interface PriceJSON {
    amount: string;
    priceType: types.CurrencyTypeJSON;
}
export declare class Price {
    readonly amount: BN;
    readonly priceType: types.CurrencyTypeKind;
    constructor(fields: PriceFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): Price;
    static toEncodable(fields: PriceFields): {
        amount: BN;
        priceType: any;
    };
    toJSON(): PriceJSON;
    static fromJSON(obj: PriceJSON): Price;
    toEncodable(): {
        amount: BN;
        priceType: any;
    };
}
