import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface GlobalFeeFields {
    delegate: PublicKey;
    fee: BN;
    feePercentage: number;
    feeType: types.FeeTypeKind;
}
export interface GlobalFeeJSON {
    delegate: string;
    fee: string;
    feePercentage: number;
    feeType: types.FeeTypeJSON;
}
export declare class GlobalFee {
    readonly delegate: PublicKey;
    readonly fee: BN;
    readonly feePercentage: number;
    readonly feeType: types.FeeTypeKind;
    constructor(fields: GlobalFeeFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.GlobalFee;
    static toEncodable(fields: GlobalFeeFields): {
        delegate: PublicKey;
        fee: BN;
        feePercentage: number;
        feeType: {
            AllMints: {};
        } | {
            PricedMintsOnly: {};
        } | {
            SkipBurnMints: {};
        };
    };
    toJSON(): GlobalFeeJSON;
    static fromJSON(obj: GlobalFeeJSON): GlobalFee;
    toEncodable(): {
        delegate: PublicKey;
        fee: BN;
        feePercentage: number;
        feeType: {
            AllMints: {};
        } | {
            PricedMintsOnly: {};
        } | {
            SkipBurnMints: {};
        };
    };
}
//# sourceMappingURL=GlobalFee.d.ts.map