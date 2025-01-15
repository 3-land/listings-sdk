import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface WrappedDestinyFields {
    pool: PublicKey;
    destinyType: number;
    flag1: number;
}
export interface WrappedDestinyJSON {
    pool: string;
    destinyType: number;
    flag1: number;
}
export declare class WrappedDestiny {
    readonly pool: PublicKey;
    readonly destinyType: number;
    readonly flag1: number;
    constructor(fields: WrappedDestinyFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.WrappedDestiny;
    static toEncodable(fields: WrappedDestinyFields): {
        pool: PublicKey;
        destinyType: number;
        flag1: number;
    };
    toJSON(): WrappedDestinyJSON;
    static fromJSON(obj: WrappedDestinyJSON): WrappedDestiny;
    toEncodable(): {
        pool: PublicKey;
        destinyType: number;
        flag1: number;
    };
}
//# sourceMappingURL=WrappedDestiny.d.ts.map