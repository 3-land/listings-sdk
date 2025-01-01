import BN from "bn.js";
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
    static fromDecoded(obj: any): SemiFungibleTraitInit;
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
