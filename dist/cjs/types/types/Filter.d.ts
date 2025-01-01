import * as types from "../types";
export interface FilterFields {
    filter1: types.FilterTypeKind;
    filter2: types.FilterTypeKind;
}
export interface FilterJSON {
    filter1: types.FilterTypeJSON;
    filter2: types.FilterTypeJSON;
}
export declare class Filter {
    readonly filter1: types.FilterTypeKind;
    readonly filter2: types.FilterTypeKind;
    constructor(fields: FilterFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.Filter;
    static toEncodable(fields: FilterFields): {
        filter1: {
            None: {};
        };
        filter2: {
            None: {};
        };
    };
    toJSON(): FilterJSON;
    static fromJSON(obj: FilterJSON): Filter;
    toEncodable(): {
        filter1: {
            None: {};
        };
        filter2: {
            None: {};
        };
    };
}
//# sourceMappingURL=Filter.d.ts.map