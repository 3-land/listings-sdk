import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface MetadataArgsFields {
    /** The name of the asset */
    name: string;
    /** The symbol for the asset */
    symbol: string;
    /** URI pointing to JSON representing the asset */
    uri: string;
    /** Royalty basis points that goes to creators in secondary sales (0-10000) */
    sellerFeeBasisPoints: number;
    primarySaleHappened: boolean;
    isMutable: boolean;
    /** nonce for easy calculation of editions, if present */
    editionNonce: number | null;
    /** Since we cannot easily change Metadata, we add the new DataV2 fields here at the end. */
    tokenStandard: types.TokenStandardKind | null;
    /** Collection */
    collection: types.CollectionFields | null;
    /** Uses */
    uses: types.UsesFields | null;
    tokenProgramVersion: types.TokenProgramVersionKind;
    creators: Array<types.CreatorFields>;
}
export interface MetadataArgsJSON {
    /** The name of the asset */
    name: string;
    /** The symbol for the asset */
    symbol: string;
    /** URI pointing to JSON representing the asset */
    uri: string;
    /** Royalty basis points that goes to creators in secondary sales (0-10000) */
    sellerFeeBasisPoints: number;
    primarySaleHappened: boolean;
    isMutable: boolean;
    /** nonce for easy calculation of editions, if present */
    editionNonce: number | null;
    /** Since we cannot easily change Metadata, we add the new DataV2 fields here at the end. */
    tokenStandard: types.TokenStandardJSON | null;
    /** Collection */
    collection: types.CollectionJSON | null;
    /** Uses */
    uses: types.UsesJSON | null;
    tokenProgramVersion: types.TokenProgramVersionJSON;
    creators: Array<types.CreatorJSON>;
}
export declare class MetadataArgs {
    /** The name of the asset */
    readonly name: string;
    /** The symbol for the asset */
    readonly symbol: string;
    /** URI pointing to JSON representing the asset */
    readonly uri: string;
    /** Royalty basis points that goes to creators in secondary sales (0-10000) */
    readonly sellerFeeBasisPoints: number;
    readonly primarySaleHappened: boolean;
    readonly isMutable: boolean;
    /** nonce for easy calculation of editions, if present */
    readonly editionNonce: number | null;
    /** Since we cannot easily change Metadata, we add the new DataV2 fields here at the end. */
    readonly tokenStandard: types.TokenStandardKind | null;
    /** Collection */
    readonly collection: types.Collection | null;
    /** Uses */
    readonly uses: types.Uses | null;
    readonly tokenProgramVersion: types.TokenProgramVersionKind;
    readonly creators: Array<types.Creator>;
    constructor(fields: MetadataArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.MetadataArgs;
    static toEncodable(fields: MetadataArgsFields): {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        primarySaleHappened: boolean;
        isMutable: boolean;
        editionNonce: number | null;
        tokenStandard: {
            NonFungible: {};
        } | {
            FungibleAsset: {};
        } | {
            Fungible: {};
        } | {
            NonFungibleEdition: {};
        } | null;
        collection: {
            verified: boolean;
            key: PublicKey;
        } | null;
        uses: {
            useMethod: {
                Burn: {};
            } | {
                Multiple: {};
            } | {
                Single: {};
            };
            remaining: BN;
            total: BN;
        } | null;
        tokenProgramVersion: {
            Original: {};
        } | {
            Token2022: {};
        };
        creators: {
            address: PublicKey;
            verified: boolean;
            share: number;
        }[];
    };
    toJSON(): MetadataArgsJSON;
    static fromJSON(obj: MetadataArgsJSON): MetadataArgs;
    toEncodable(): {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        primarySaleHappened: boolean;
        isMutable: boolean;
        editionNonce: number | null;
        tokenStandard: {
            NonFungible: {};
        } | {
            FungibleAsset: {};
        } | {
            Fungible: {};
        } | {
            NonFungibleEdition: {};
        } | null;
        collection: {
            verified: boolean;
            key: PublicKey;
        } | null;
        uses: {
            useMethod: {
                Burn: {};
            } | {
                Multiple: {};
            } | {
                Single: {};
            };
            remaining: BN;
            total: BN;
        } | null;
        tokenProgramVersion: {
            Original: {};
        } | {
            Token2022: {};
        };
        creators: {
            address: PublicKey;
            verified: boolean;
            share: number;
        }[];
    };
}
//# sourceMappingURL=MetadataArgs.d.ts.map