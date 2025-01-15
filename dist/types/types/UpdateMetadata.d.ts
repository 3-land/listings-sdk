import BN from "bn.js";
import * as types from "../types";
export interface UpdateMetadataFields {
    name: string;
    uri: string;
    uriType: number;
    hashTraits: BN;
}
export interface UpdateMetadataJSON {
    name: string;
    uri: string;
    uriType: number;
    hashTraits: string;
}
export declare class UpdateMetadata {
    readonly name: string;
    readonly uri: string;
    readonly uriType: number;
    readonly hashTraits: BN;
    constructor(fields: UpdateMetadataFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.UpdateMetadata;
    static toEncodable(fields: UpdateMetadataFields): {
        name: string;
        uri: string;
        uriType: number;
        hashTraits: BN;
    };
    toJSON(): UpdateMetadataJSON;
    static fromJSON(obj: UpdateMetadataJSON): UpdateMetadata;
    toEncodable(): {
        name: string;
        uri: string;
        uriType: number;
        hashTraits: BN;
    };
}
//# sourceMappingURL=UpdateMetadata.d.ts.map