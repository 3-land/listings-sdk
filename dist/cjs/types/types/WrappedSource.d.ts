import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface WrappedSourceFields {
    pool: PublicKey;
    amount: BN;
    distribution: number;
    track: number;
}
export interface WrappedSourceJSON {
    pool: string;
    amount: string;
    distribution: number;
    track: number;
}
export declare class WrappedSource {
    readonly pool: PublicKey;
    readonly amount: BN;
    readonly distribution: number;
    readonly track: number;
    constructor(fields: WrappedSourceFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.WrappedSource;
    static toEncodable(fields: WrappedSourceFields): {
        pool: PublicKey;
        amount: BN;
        distribution: number;
        track: number;
    };
    toJSON(): WrappedSourceJSON;
    static fromJSON(obj: WrappedSourceJSON): WrappedSource;
    toEncodable(): {
        pool: PublicKey;
        amount: BN;
        distribution: number;
        track: number;
    };
}
//# sourceMappingURL=WrappedSource.d.ts.map