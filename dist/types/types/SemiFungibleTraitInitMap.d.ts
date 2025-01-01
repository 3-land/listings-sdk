import BN from "bn.js";
export interface SemiFungibleTraitInitMapFields {
    hash: BN;
    amount: BN;
    index: number;
}
export interface SemiFungibleTraitInitMapJSON {
    hash: string;
    amount: string;
    index: number;
}
export declare class SemiFungibleTraitInitMap {
    readonly hash: BN;
    readonly amount: BN;
    readonly index: number;
    constructor(fields: SemiFungibleTraitInitMapFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): SemiFungibleTraitInitMap;
    static toEncodable(fields: SemiFungibleTraitInitMapFields): {
        hash: BN;
        amount: BN;
        index: number;
    };
    toJSON(): SemiFungibleTraitInitMapJSON;
    static fromJSON(obj: SemiFungibleTraitInitMapJSON): SemiFungibleTraitInitMap;
    toEncodable(): {
        hash: BN;
        amount: BN;
        index: number;
    };
}
