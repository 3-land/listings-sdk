import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface ShortMetadataArgsFields {
    name: string;
    uri: string;
    uriType: number;
    sellerFeeBasisPoints: number;
    collection: PublicKey;
    creators: Array<types.ShortCreatorFields>;
}
export interface ShortMetadataArgsJSON {
    name: string;
    uri: string;
    uriType: number;
    sellerFeeBasisPoints: number;
    collection: string;
    creators: Array<types.ShortCreatorJSON>;
}
export declare class ShortMetadataArgs {
    readonly name: string;
    readonly uri: string;
    readonly uriType: number;
    readonly sellerFeeBasisPoints: number;
    readonly collection: PublicKey;
    readonly creators: Array<types.ShortCreator>;
    constructor(fields: ShortMetadataArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ShortMetadataArgs;
    static toEncodable(fields: ShortMetadataArgsFields): {
        name: string;
        uri: string;
        uriType: number;
        sellerFeeBasisPoints: number;
        collection: PublicKey;
        creators: {
            address: PublicKey;
            share: number;
        }[];
    };
    toJSON(): ShortMetadataArgsJSON;
    static fromJSON(obj: ShortMetadataArgsJSON): ShortMetadataArgs;
    toEncodable(): {
        name: string;
        uri: string;
        uriType: number;
        sellerFeeBasisPoints: number;
        collection: PublicKey;
        creators: {
            address: PublicKey;
            share: number;
        }[];
    };
}
//# sourceMappingURL=ShortMetadataArgs.d.ts.map