import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface CurrencyFields {
    address: PublicKey;
    deposit: BN;
    secured: BN;
    decimals: number;
}
export interface CurrencyJSON {
    address: string;
    deposit: string;
    secured: string;
    decimals: number;
}
export declare class Currency {
    readonly address: PublicKey;
    readonly deposit: BN;
    readonly secured: BN;
    readonly decimals: number;
    constructor(fields: CurrencyFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.Currency;
    static toEncodable(fields: CurrencyFields): {
        address: PublicKey;
        deposit: BN;
        secured: BN;
        decimals: number;
    };
    toJSON(): CurrencyJSON;
    static fromJSON(obj: CurrencyJSON): Currency;
    toEncodable(): {
        address: PublicKey;
        deposit: BN;
        secured: BN;
        decimals: number;
    };
}
//# sourceMappingURL=Currency.d.ts.map