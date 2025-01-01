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
    static fromDecoded(obj: any): FeedingTraits;
    static toEncodable(fields: FeedingTraitsFields): {
        list: any[];
    };
    toJSON(): FeedingTraitsJSON;
    static fromJSON(obj: FeedingTraitsJSON): FeedingTraits;
    toEncodable(): {
        list: any[];
    };
}
