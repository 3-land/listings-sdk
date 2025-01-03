import BN from "bn.js";
import * as types from "../types";
export interface NonFungibleTraitInitFields {
    hash: BN;
    values: Array<BN>;
}
export interface NonFungibleTraitInitJSON {
    hash: string;
    values: Array<string>;
}
export declare class NonFungibleTraitInit {
    readonly hash: BN;
    readonly values: Array<BN>;
    constructor(fields: NonFungibleTraitInitFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.NonFungibleTraitInit;
    static toEncodable(fields: NonFungibleTraitInitFields): {
        hash: BN;
        values: BN[];
    };
    toJSON(): NonFungibleTraitInitJSON;
    static fromJSON(obj: NonFungibleTraitInitJSON): NonFungibleTraitInit;
    toEncodable(): {
        hash: BN;
        values: BN[];
    };
}
//# sourceMappingURL=NonFungibleTraitInit.d.ts.map