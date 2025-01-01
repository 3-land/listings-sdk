import BN from "bn.js";
import * as types from "../types";
export interface PopularityFields {
    lastReset: number;
    count: BN;
    state: types.PopularityStateKind;
}
export interface PopularityJSON {
    lastReset: number;
    count: string;
    state: types.PopularityStateJSON;
}
export declare class Popularity {
    readonly lastReset: number;
    readonly count: BN;
    readonly state: types.PopularityStateKind;
    constructor(fields: PopularityFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): Popularity;
    static toEncodable(fields: PopularityFields): {
        lastReset: number;
        count: BN;
        state: any;
    };
    toJSON(): PopularityJSON;
    static fromJSON(obj: PopularityJSON): Popularity;
    toEncodable(): {
        lastReset: number;
        count: BN;
        state: any;
    };
}
