import * as types from "../types";
export interface SuperCategoryFields {
    cat1: number;
    cat2: number;
}
export interface SuperCategoryJSON {
    cat1: number;
    cat2: number;
}
export declare class SuperCategory {
    readonly cat1: number;
    readonly cat2: number;
    constructor(fields: SuperCategoryFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SuperCategory;
    static toEncodable(fields: SuperCategoryFields): {
        cat1: number;
        cat2: number;
    };
    toJSON(): SuperCategoryJSON;
    static fromJSON(obj: SuperCategoryJSON): SuperCategory;
    toEncodable(): {
        cat1: number;
        cat2: number;
    };
}
//# sourceMappingURL=SuperCategory.d.ts.map