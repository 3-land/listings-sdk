import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface UnwrapMetadataFields {
    wrappedAmount: BN;
    decimals: number;
    traitHash: BN;
    name: string;
    arweave: string;
    edition: number;
    leafIndex: number;
    cardIndex: number | null;
    royalty: number;
    creators: Array<types.ShortCreatorFields>;
    bumps: Array<number>;
}
export interface UnwrapMetadataJSON {
    wrappedAmount: string;
    decimals: number;
    traitHash: string;
    name: string;
    arweave: string;
    edition: number;
    leafIndex: number;
    cardIndex: number | null;
    royalty: number;
    creators: Array<types.ShortCreatorJSON>;
    bumps: Array<number>;
}
export declare class UnwrapMetadata {
    readonly wrappedAmount: BN;
    readonly decimals: number;
    readonly traitHash: BN;
    readonly name: string;
    readonly arweave: string;
    readonly edition: number;
    readonly leafIndex: number;
    readonly cardIndex: number | null;
    readonly royalty: number;
    readonly creators: Array<types.ShortCreator>;
    readonly bumps: Array<number>;
    constructor(fields: UnwrapMetadataFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): UnwrapMetadata;
    static toEncodable(fields: UnwrapMetadataFields): {
        wrappedAmount: BN;
        decimals: number;
        traitHash: BN;
        name: string;
        arweave: string;
        edition: number;
        leafIndex: number;
        cardIndex: number | null;
        royalty: number;
        creators: {
            address: PublicKey;
            share: number;
        }[];
        bumps: number[];
    };
    toJSON(): UnwrapMetadataJSON;
    static fromJSON(obj: UnwrapMetadataJSON): UnwrapMetadata;
    toEncodable(): {
        wrappedAmount: BN;
        decimals: number;
        traitHash: BN;
        name: string;
        arweave: string;
        edition: number;
        leafIndex: number;
        cardIndex: number | null;
        royalty: number;
        creators: {
            address: PublicKey;
            share: number;
        }[];
        bumps: number[];
    };
}
//# sourceMappingURL=UnwrapMetadata.d.ts.map