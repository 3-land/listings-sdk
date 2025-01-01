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
    static fromDecoded(obj: any): Item;
    static toEncodable(fields: ItemFields): {
        metadata: any;
    };
    toJSON(): ItemJSON;
    static fromJSON(obj: ItemJSON): Item;
    toEncodable(): {
        metadata: any;
    };
}
