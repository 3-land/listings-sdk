import { PublicKey } from "@solana/web3.js";
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
    static fromDecoded(obj: any): types.Price;
    static toEncodable(fields: PriceFields): {
        amount: BN;
        priceType: {
            Native: {};
        } | {
            Spl: {
                id: PublicKey;
            };
        } | {
            Collection: {
                id: PublicKey;
            };
        } | {
            Creator: {
                id: PublicKey;
            };
        } | {
            None: {};
        };
    };
    toJSON(): PriceJSON;
    static fromJSON(obj: PriceJSON): Price;
    toEncodable(): {
        amount: BN;
        priceType: {
            Native: {};
        } | {
            Spl: {
                id: PublicKey;
            };
        } | {
            Collection: {
                id: PublicKey;
            };
        } | {
            Creator: {
                id: PublicKey;
            };
        } | {
            None: {};
        };
    };
}
//# sourceMappingURL=Price.d.ts.map