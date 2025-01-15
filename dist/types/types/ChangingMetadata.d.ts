import BN from "bn.js";
import * as types from "../types";
export interface ChangingMetadataFields {
    edition: BN;
    name: string | null;
    uri: string | null;
    hashTraits: BN | null;
    afterTraits: string | null;
}
export interface ChangingMetadataJSON {
    edition: string;
    name: string | null;
    uri: string | null;
    hashTraits: string | null;
    afterTraits: string | null;
}
export declare class ChangingMetadata {
    readonly edition: BN;
    readonly name: string | null;
    readonly uri: string | null;
    readonly hashTraits: BN | null;
    readonly afterTraits: string | null;
    constructor(fields: ChangingMetadataFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ChangingMetadata;
    static toEncodable(fields: ChangingMetadataFields): {
        edition: BN;
        name: string | null;
        uri: string | null;
        hashTraits: BN | null;
        afterTraits: string | null;
    };
    toJSON(): ChangingMetadataJSON;
    static fromJSON(obj: ChangingMetadataJSON): ChangingMetadata;
    toEncodable(): {
        edition: BN;
        name: string | null;
        uri: string | null;
        hashTraits: BN | null;
        afterTraits: string | null;
    };
}
//# sourceMappingURL=ChangingMetadata.d.ts.map