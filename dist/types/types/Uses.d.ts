import BN from "bn.js";
import * as types from "../types";
export interface UsesFields {
    useMethod: types.UseMethodKind;
    remaining: BN;
    total: BN;
}
export interface UsesJSON {
    useMethod: types.UseMethodJSON;
    remaining: string;
    total: string;
}
export declare class Uses {
    readonly useMethod: types.UseMethodKind;
    readonly remaining: BN;
    readonly total: BN;
    constructor(fields: UsesFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.Uses;
    static toEncodable(fields: UsesFields): {
        useMethod: {
            Burn: {};
        } | {
            Multiple: {};
        } | {
            Single: {};
        };
        remaining: BN;
        total: BN;
    };
    toJSON(): UsesJSON;
    static fromJSON(obj: UsesJSON): Uses;
    toEncodable(): {
        useMethod: {
            Burn: {};
        } | {
            Multiple: {};
        } | {
            Single: {};
        };
        remaining: BN;
        total: BN;
    };
}
//# sourceMappingURL=Uses.d.ts.map