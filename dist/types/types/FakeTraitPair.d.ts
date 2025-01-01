export interface FakeTraitPairFields {
    trait_type: string;
    value: string;
}
export interface FakeTraitPairJSON {
    trait_type: string;
    value: string;
}
export declare class FakeTraitPair {
    readonly trait_type: string;
    readonly value: string;
    constructor(fields: FakeTraitPairFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): FakeTraitPair;
    static toEncodable(fields: FakeTraitPairFields): {
        trait_type: string;
        value: string;
    };
    toJSON(): FakeTraitPairJSON;
    static fromJSON(obj: FakeTraitPairJSON): FakeTraitPair;
    toEncodable(): {
        trait_type: string;
        value: string;
    };
}
