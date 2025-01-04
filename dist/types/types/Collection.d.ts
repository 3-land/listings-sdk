import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface CollectionFields {
    verified: boolean;
    key: PublicKey;
}
export interface CollectionJSON {
    verified: boolean;
    key: string;
}
export declare class Collection {
    readonly verified: boolean;
    readonly key: PublicKey;
    constructor(fields: CollectionFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.Collection;
    static toEncodable(fields: CollectionFields): {
        verified: boolean;
        key: PublicKey;
    };
    toJSON(): CollectionJSON;
    static fromJSON(obj: CollectionJSON): Collection;
    toEncodable(): {
        verified: boolean;
        key: PublicKey;
    };
}
//# sourceMappingURL=Collection.d.ts.map