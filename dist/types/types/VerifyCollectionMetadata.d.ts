import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface VerifyCollectionMetadataFields {
    name: string;
    symbol: string;
    uri: string;
    royalty: number;
    collection: number;
    creators: Array<types.CreatorFields>;
}
export interface VerifyCollectionMetadataJSON {
    name: string;
    symbol: string;
    uri: string;
    royalty: number;
    collection: number;
    creators: Array<types.CreatorJSON>;
}
export declare class VerifyCollectionMetadata {
    readonly name: string;
    readonly symbol: string;
    readonly uri: string;
    readonly royalty: number;
    readonly collection: number;
    readonly creators: Array<types.Creator>;
    constructor(fields: VerifyCollectionMetadataFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): VerifyCollectionMetadata;
    static toEncodable(fields: VerifyCollectionMetadataFields): {
        name: string;
        symbol: string;
        uri: string;
        royalty: number;
        collection: number;
        creators: {
            address: PublicKey;
            verified: boolean;
            share: number;
        }[];
    };
    toJSON(): VerifyCollectionMetadataJSON;
    static fromJSON(obj: VerifyCollectionMetadataJSON): VerifyCollectionMetadata;
    toEncodable(): {
        name: string;
        symbol: string;
        uri: string;
        royalty: number;
        collection: number;
        creators: {
            address: PublicKey;
            verified: boolean;
            share: number;
        }[];
    };
}
//# sourceMappingURL=VerifyCollectionMetadata.d.ts.map