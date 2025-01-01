import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface ShortCreatorFields {
    address: PublicKey;
    share: number;
}
export interface ShortCreatorJSON {
    address: string;
    share: number;
}
export declare class ShortCreator {
    readonly address: PublicKey;
    readonly share: number;
    constructor(fields: ShortCreatorFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ShortCreator;
    static toEncodable(fields: ShortCreatorFields): {
        address: PublicKey;
        share: number;
    };
    toJSON(): ShortCreatorJSON;
    static fromJSON(obj: ShortCreatorJSON): ShortCreator;
    toEncodable(): {
        address: PublicKey;
        share: number;
    };
}
//# sourceMappingURL=ShortCreator.d.ts.map