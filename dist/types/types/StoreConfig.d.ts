import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface StoreConfigFields {
    fee: BN;
    feePercentage: number;
    feeType: types.FeeTypeKind;
    trust: PublicKey;
    rules: Array<types.StoreRuleKind>;
}
export interface StoreConfigJSON {
    fee: string;
    feePercentage: number;
    feeType: types.FeeTypeJSON;
    trust: string;
    rules: Array<types.StoreRuleJSON>;
}
export declare class StoreConfig {
    readonly fee: BN;
    readonly feePercentage: number;
    readonly feeType: types.FeeTypeKind;
    readonly trust: PublicKey;
    readonly rules: Array<types.StoreRuleKind>;
    constructor(fields: StoreConfigFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): StoreConfig;
    static toEncodable(fields: StoreConfigFields): {
        fee: BN;
        feePercentage: number;
        feeType: any;
        trust: PublicKey;
        rules: any[];
    };
    toJSON(): StoreConfigJSON;
    static fromJSON(obj: StoreConfigJSON): StoreConfig;
    toEncodable(): {
        fee: BN;
        feePercentage: number;
        feeType: any;
        trust: PublicKey;
        rules: any[];
    };
}
