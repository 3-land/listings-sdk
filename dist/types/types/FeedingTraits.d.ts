import BN from "bn.js";
import * as types from "../types";
export interface FeedingTraitsFields {
    list: Array<types.TraitInitKind>;
}
export interface FeedingTraitsJSON {
    list: Array<types.TraitInitJSON>;
}
export declare class FeedingTraits {
    readonly list: Array<types.TraitInitKind>;
    constructor(fields: FeedingTraitsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.FeedingTraits;
    static toEncodable(fields: FeedingTraitsFields): {
        list: ({
            SemiFungible: {
                hash: BN;
            };
        } | {
            Date: {
                hash: BN;
            };
        } | {
            NonFungible: {
                hash: BN;
                values: BN[];
            };
        } | {
            Data: {
                hash: BN;
            };
        })[];
    };
    toJSON(): FeedingTraitsJSON;
    static fromJSON(obj: FeedingTraitsJSON): FeedingTraits;
    toEncodable(): {
        list: ({
            SemiFungible: {
                hash: BN;
            };
        } | {
            Date: {
                hash: BN;
            };
        } | {
            NonFungible: {
                hash: BN;
                values: BN[];
            };
        } | {
            Data: {
                hash: BN;
            };
        })[];
    };
}
//# sourceMappingURL=FeedingTraits.d.ts.map