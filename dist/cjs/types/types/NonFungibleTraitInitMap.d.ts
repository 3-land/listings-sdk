import BN from "bn.js";
import * as types from "../types";
export interface NonFungibleTraitInitMapFields {
    hash: BN;
    values: Array<types.FakeTraitValueFields>;
    index: number;
}
export interface NonFungibleTraitInitMapJSON {
    hash: string;
    values: Array<types.FakeTraitValueJSON>;
    index: number;
}
export declare class NonFungibleTraitInitMap {
    readonly hash: BN;
    readonly values: Array<types.FakeTraitValue>;
    readonly index: number;
    constructor(fields: NonFungibleTraitInitMapFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.NonFungibleTraitInitMap;
    static toEncodable(fields: NonFungibleTraitInitMapFields): {
        hash: BN;
        values: {
            trait_value: BN;
            state: number;
        }[];
        index: number;
    };
    toJSON(): NonFungibleTraitInitMapJSON;
    static fromJSON(obj: NonFungibleTraitInitMapJSON): NonFungibleTraitInitMap;
    toEncodable(): {
        hash: BN;
        values: {
            trait_value: BN;
            state: number;
        }[];
        index: number;
    };
}
//# sourceMappingURL=NonFungibleTraitInitMap.d.ts.map