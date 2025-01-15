import BN from "bn.js";
import * as types from "../types";
export interface DataTraitInitFields {
    hash: BN;
    data: BN;
}
export interface DataTraitInitJSON {
    hash: string;
    data: string;
}
export declare class DataTraitInit {
    readonly hash: BN;
    readonly data: BN;
    constructor(fields: DataTraitInitFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.DataTraitInit;
    static toEncodable(fields: DataTraitInitFields): {
        hash: BN;
        data: BN;
    };
    toJSON(): DataTraitInitJSON;
    static fromJSON(obj: DataTraitInitJSON): DataTraitInit;
    toEncodable(): {
        hash: BN;
        data: BN;
    };
}
//# sourceMappingURL=DataTraitInit.d.ts.map