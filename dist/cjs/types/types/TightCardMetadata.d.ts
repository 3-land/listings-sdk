import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface TightCardMetadataFields {
    traitHash: BN;
    name: string;
    arweave: string;
    royalty: number;
    chunkSize: number;
    creators: Array<types.ShortCreatorFields>;
    uploader: PublicKey | null;
}
export interface TightCardMetadataJSON {
    traitHash: string;
    name: string;
    arweave: string;
    royalty: number;
    chunkSize: number;
    creators: Array<types.ShortCreatorJSON>;
    uploader: string | null;
}
export declare class TightCardMetadata {
    readonly traitHash: BN;
    readonly name: string;
    readonly arweave: string;
    readonly royalty: number;
    readonly chunkSize: number;
    readonly creators: Array<types.ShortCreator>;
    readonly uploader: PublicKey | null;
    constructor(fields: TightCardMetadataFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.TightCardMetadata;
    static toEncodable(fields: TightCardMetadataFields): {
        traitHash: BN;
        name: string;
        arweave: string;
        royalty: number;
        chunkSize: number;
        creators: {
            address: PublicKey;
            share: number;
        }[];
        uploader: PublicKey | null;
    };
    toJSON(): TightCardMetadataJSON;
    static fromJSON(obj: TightCardMetadataJSON): TightCardMetadata;
    toEncodable(): {
        traitHash: BN;
        name: string;
        arweave: string;
        royalty: number;
        chunkSize: number;
        creators: {
            address: PublicKey;
            share: number;
        }[];
        uploader: PublicKey | null;
    };
}
//# sourceMappingURL=TightCardMetadata.d.ts.map