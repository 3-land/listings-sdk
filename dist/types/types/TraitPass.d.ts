import * as types from "../types";
export interface TraitPassFields {
    list: Array<types.TraitPassTypeKind>;
}
export interface TraitPassJSON {
    list: Array<types.TraitPassTypeJSON>;
}
export declare class TraitPass {
    readonly list: Array<types.TraitPassTypeKind>;
    constructor(fields: TraitPassFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): TraitPass;
    static toEncodable(fields: TraitPassFields): {
        list: any[];
    };
    toJSON(): TraitPassJSON;
    static fromJSON(obj: TraitPassJSON): TraitPass;
    toEncodable(): {
        list: any[];
    };
}
