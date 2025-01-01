import BN from "bn.js";
import * as types from "../types";
export interface SemiFungibleTraitInitFields {
    hash: BN;
    amount: BN;
}
export interface SemiFungibleTraitInitJSON {
    hash: string;
    amount: string;
}
export declare class SemiFungibleTraitInit {
    readonly hash: BN;
    readonly amount: BN;
    constructor(fields: SemiFungibleTraitInitFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SemiFungibleTraitInit;
    static toEncodable(fields: SemiFungibleTraitInitFields): {
        hash: BN;
        amount: BN;
    };
    toJSON(): SemiFungibleTraitInitJSON;
    static fromJSON(obj: SemiFungibleTraitInitJSON): SemiFungibleTraitInit;
    toEncodable(): {
        hash: BN;
        amount: BN;
    };
}
//# sourceMappingURL=SemiFungibleTraitInit.d.ts.map