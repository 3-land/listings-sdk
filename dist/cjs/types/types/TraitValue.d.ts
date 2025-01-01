import BN from "bn.js";
import * as types from "../types";
export interface TraitValueFields {
    hash: BN;
    count: number;
    supply: BN;
}
export interface TraitValueJSON {
    hash: string;
    count: number;
    supply: string;
}
export declare class TraitValue {
    readonly hash: BN;
    readonly count: number;
    readonly supply: BN;
    constructor(fields: TraitValueFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.TraitValue;
    static toEncodable(fields: TraitValueFields): {
        hash: BN;
        count: number;
        supply: BN;
    };
    toJSON(): TraitValueJSON;
    static fromJSON(obj: TraitValueJSON): TraitValue;
    toEncodable(): {
        hash: BN;
        count: number;
        supply: BN;
    };
}
//# sourceMappingURL=TraitValue.d.ts.map