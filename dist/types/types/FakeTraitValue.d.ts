import BN from "bn.js";
import * as types from "../types";
export interface FakeTraitValueFields {
    trait_value: BN;
    state: number;
}
export interface FakeTraitValueJSON {
    trait_value: string;
    state: number;
}
export declare class FakeTraitValue {
    readonly trait_value: BN;
    readonly state: number;
    constructor(fields: FakeTraitValueFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.FakeTraitValue;
    static toEncodable(fields: FakeTraitValueFields): {
        trait_value: BN;
        state: number;
    };
    toJSON(): FakeTraitValueJSON;
    static fromJSON(obj: FakeTraitValueJSON): FakeTraitValue;
    toEncodable(): {
        trait_value: BN;
        state: number;
    };
}
//# sourceMappingURL=FakeTraitValue.d.ts.map