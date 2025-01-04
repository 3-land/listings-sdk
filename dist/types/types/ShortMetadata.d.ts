import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ShortMetadataFields {
    index: number;
    supply: BN | null;
    traitHash: BN;
    name: string;
    arweave: string;
    traitPass: types.TraitPassFields | null;
    royalty: number | null;
    creators: Array<types.ShortCreatorFields> | null;
}
export interface ShortMetadataJSON {
    index: number;
    supply: string | null;
    traitHash: string;
    name: string;
    arweave: string;
    traitPass: types.TraitPassJSON | null;
    royalty: number | null;
    creators: Array<types.ShortCreatorJSON> | null;
}
export declare class ShortMetadata {
    readonly index: number;
    readonly supply: BN | null;
    readonly traitHash: BN;
    readonly name: string;
    readonly arweave: string;
    readonly traitPass: types.TraitPass | null;
    readonly royalty: number | null;
    readonly creators: Array<types.ShortCreator> | null;
    constructor(fields: ShortMetadataFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ShortMetadata;
    static toEncodable(fields: ShortMetadataFields): {
        index: number;
        supply: BN | null;
        traitHash: BN;
        name: string;
        arweave: string;
        traitPass: {
            list: ({
                SemiFungible: {
                    typeId: number;
                    amount: BN;
                };
            } | {
                Date: {
                    typeId: number;
                    date: number;
                };
            } | {
                NonFungible: {
                    typeId: number;
                    valueId: number;
                };
            })[];
        } | null;
        royalty: number | null;
        creators: {
            address: PublicKey;
            share: number;
        }[] | null;
    };
    toJSON(): ShortMetadataJSON;
    static fromJSON(obj: ShortMetadataJSON): ShortMetadata;
    toEncodable(): {
        index: number;
        supply: BN | null;
        traitHash: BN;
        name: string;
        arweave: string;
        traitPass: {
            list: ({
                SemiFungible: {
                    typeId: number;
                    amount: BN;
                };
            } | {
                Date: {
                    typeId: number;
                    date: number;
                };
            } | {
                NonFungible: {
                    typeId: number;
                    valueId: number;
                };
            })[];
        } | null;
        royalty: number | null;
        creators: {
            address: PublicKey;
            share: number;
        }[] | null;
    };
}
//# sourceMappingURL=ShortMetadata.d.ts.map