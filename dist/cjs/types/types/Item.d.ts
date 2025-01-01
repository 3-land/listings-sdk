import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ItemFields {
    metadata: types.MetadataArgsFields;
}
export interface ItemJSON {
    metadata: types.MetadataArgsJSON;
}
export declare class Item {
    readonly metadata: types.MetadataArgs;
    constructor(fields: ItemFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.Item;
    static toEncodable(fields: ItemFields): {
        metadata: {
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
    };
    toJSON(): ItemJSON;
    static fromJSON(obj: ItemJSON): Item;
    toEncodable(): {
        metadata: {
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
    };
}
//# sourceMappingURL=Item.d.ts.map