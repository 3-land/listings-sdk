import BN from "bn.js";
import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export type SemiFungibleFields = {
    hash: BN;
};
export type SemiFungibleValue = {
    hash: BN;
};
export interface SemiFungibleJSON {
    kind: "SemiFungible";
    value: {
        hash: string;
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
        };
    };
}
export type DateFields = {
    hash: BN;
};
export type DateValue = {
    hash: BN;
};
export interface DateJSON {
    kind: "Date";
    value: {
        hash: string;
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
        };
    };
}
export type NonFungibleFields = {
    hash: BN;
    values: Array<BN>;
};
export type NonFungibleValue = {
    hash: BN;
    values: Array<BN>;
};
export interface NonFungibleJSON {
    kind: "NonFungible";
    value: {
        hash: string;
        values: Array<string>;
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
            values: BN[];
        };
    };
}
export type DataFields = {
    hash: BN;
};
export type DataValue = {
    hash: BN;
};
export interface DataJSON {
    kind: "Data";
    value: {
        hash: string;
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
        };
    };
}
export declare function fromDecoded(obj: any): types.TraitInitKind;
export declare function fromJSON(obj: types.TraitInitJSON): types.TraitInitKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=TraitInit.d.ts.map