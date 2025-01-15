import BN from "bn.js";
import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export type SemiFungibleFields = {
    hash: BN;
    count: number;
    supply: BN;
    total: BN;
};
export type SemiFungibleValue = {
    hash: BN;
    count: number;
    supply: BN;
    total: BN;
};
export interface SemiFungibleJSON {
    kind: "SemiFungible";
    value: {
        hash: string;
        count: number;
        supply: string;
        total: string;
    };
}
export declare class SemiFungible {
    static readonly discriminator = 0;
    static readonly kind = "SemiFungible";
    readonly discriminator = 0;
    readonly kind = "SemiFungible";
    readonly value: SemiFungibleValue;
    constructor(value: SemiFungibleFields);
    toJSON(): SemiFungibleJSON;
    toEncodable(): {
        SemiFungible: {
            hash: BN;
            count: number;
            supply: BN;
            total: BN;
        };
    };
}
export type DateFields = {
    hash: BN;
    count: number;
    supply: BN;
};
export type DateValue = {
    hash: BN;
    count: number;
    supply: BN;
};
export interface DateJSON {
    kind: "Date";
    value: {
        hash: string;
        count: number;
        supply: string;
    };
}
export declare class Date {
    static readonly discriminator = 1;
    static readonly kind = "Date";
    readonly discriminator = 1;
    readonly kind = "Date";
    readonly value: DateValue;
    constructor(value: DateFields);
    toJSON(): DateJSON;
    toEncodable(): {
        Date: {
            hash: BN;
            count: number;
            supply: BN;
        };
    };
}
export type NonFungibleFields = {
    hash: BN;
    values: Array<types.TraitValueFields>;
};
export type NonFungibleValue = {
    hash: BN;
    values: Array<types.TraitValue>;
};
export interface NonFungibleJSON {
    kind: "NonFungible";
    value: {
        hash: string;
        values: Array<types.TraitValueJSON>;
    };
}
export declare class NonFungible {
    static readonly discriminator = 2;
    static readonly kind = "NonFungible";
    readonly discriminator = 2;
    readonly kind = "NonFungible";
    readonly value: NonFungibleValue;
    constructor(value: NonFungibleFields);
    toJSON(): NonFungibleJSON;
    toEncodable(): {
        NonFungible: {
            hash: BN;
            values: {
                hash: BN;
                count: number;
                supply: BN;
            }[];
        };
    };
}
export type DataFields = {
    hash: BN;
    count: number;
    supply: BN;
};
export type DataValue = {
    hash: BN;
    count: number;
    supply: BN;
};
export interface DataJSON {
    kind: "Data";
    value: {
        hash: string;
        count: number;
        supply: string;
    };
}
export declare class Data {
    static readonly discriminator = 3;
    static readonly kind = "Data";
    readonly discriminator = 3;
    readonly kind = "Data";
    readonly value: DataValue;
    constructor(value: DataFields);
    toJSON(): DataJSON;
    toEncodable(): {
        Data: {
            hash: BN;
            count: number;
            supply: BN;
        };
    };
}
export declare function fromDecoded(obj: any): types.TraitTypeKind;
export declare function fromJSON(obj: types.TraitTypeJSON): types.TraitTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=TraitType.d.ts.map