import BN from "bn.js";
import * as types from "../types";
export interface DateTraitInitMapFields {
    hash: BN;
    date: number;
    index: number;
}
export interface DateTraitInitMapJSON {
    hash: string;
    date: number;
    index: number;
}
export declare class DateTraitInitMap {
    readonly hash: BN;
    readonly date: number;
    readonly index: number;
    constructor(fields: DateTraitInitMapFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.DateTraitInitMap;
    static toEncodable(fields: DateTraitInitMapFields): {
        hash: BN;
        date: number;
        index: number;
    };
    toJSON(): DateTraitInitMapJSON;
    static fromJSON(obj: DateTraitInitMapJSON): DateTraitInitMap;
    toEncodable(): {
        hash: BN;
        date: number;
        index: number;
    };
}
//# sourceMappingURL=DateTraitInitMap.d.ts.map