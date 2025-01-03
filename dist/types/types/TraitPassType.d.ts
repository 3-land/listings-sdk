import BN from "bn.js";
import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export type SemiFungibleFields = {
    typeId: number;
    amount: BN;
};
export type SemiFungibleValue = {
    typeId: number;
    amount: BN;
};
export interface SemiFungibleJSON {
    kind: "SemiFungible";
    value: {
        typeId: number;
        amount: string;
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
            typeId: number;
            amount: BN;
        };
    };
}
export type DateFields = {
    typeId: number;
    date: number;
};
export type DateValue = {
    typeId: number;
    date: number;
};
export interface DateJSON {
    kind: "Date";
    value: {
        typeId: number;
        date: number;
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
            typeId: number;
            date: number;
        };
    };
}
export type NonFungibleFields = {
    typeId: number;
    valueId: number;
};
export type NonFungibleValue = {
    typeId: number;
    valueId: number;
};
export interface NonFungibleJSON {
    kind: "NonFungible";
    value: {
        typeId: number;
        valueId: number;
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
            typeId: number;
            valueId: number;
        };
    };
}
export declare function fromDecoded(obj: any): types.TraitPassTypeKind;
export declare function fromJSON(obj: types.TraitPassTypeJSON): types.TraitPassTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=TraitPassType.d.ts.map