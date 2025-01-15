import BN from "bn.js";
import * as types from "../types";
export interface DataTraitInitMapFields {
    hash: BN;
    data: BN;
    index: number;
}
export interface DataTraitInitMapJSON {
    hash: string;
    data: string;
    index: number;
}
export declare class DataTraitInitMap {
    readonly hash: BN;
    readonly data: BN;
    readonly index: number;
    constructor(fields: DataTraitInitMapFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.DataTraitInitMap;
    static toEncodable(fields: DataTraitInitMapFields): {
        hash: BN;
        data: BN;
        index: number;
    };
    toJSON(): DataTraitInitMapJSON;
    static fromJSON(obj: DataTraitInitMapJSON): DataTraitInitMap;
    toEncodable(): {
        hash: BN;
        data: BN;
        index: number;
    };
}
//# sourceMappingURL=DataTraitInitMap.d.ts.map