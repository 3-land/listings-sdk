import BN from "bn.js";
import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface NoneJSON {
    kind: "None";
}
export declare class None {
    static readonly discriminator = 0;
    static readonly kind = "None";
    readonly discriminator = 0;
    readonly kind = "None";
    toJSON(): NoneJSON;
    toEncodable(): {
        None: {};
    };
}
export interface AndJSON {
    kind: "And";
}
export declare class And {
    static readonly discriminator = 1;
    static readonly kind = "And";
    readonly discriminator = 1;
    readonly kind = "And";
    toJSON(): AndJSON;
    toEncodable(): {
        And: {};
    };
}
export interface OrJSON {
    kind: "Or";
}
export declare class Or {
    static readonly discriminator = 2;
    static readonly kind = "Or";
    readonly discriminator = 2;
    readonly kind = "Or";
    toJSON(): OrJSON;
    toEncodable(): {
        Or: {};
    };
}
export type BondingLinearFields = {
    initial: BN;
    rate: BN;
    index: number;
    max: number;
    min: number;
};
export type BondingLinearValue = {
    initial: BN;
    rate: BN;
    index: number;
    max: number;
    min: number;
};
export interface BondingLinearJSON {
    kind: "BondingLinear";
    value: {
        initial: string;
        rate: string;
        index: number;
        max: number;
        min: number;
    };
}
export declare class BondingLinear {
    static readonly discriminator = 3;
    static readonly kind = "BondingLinear";
    readonly discriminator = 3;
    readonly kind = "BondingLinear";
    readonly value: BondingLinearValue;
    constructor(value: BondingLinearFields);
    toJSON(): BondingLinearJSON;
    toEncodable(): {
        BondingLinear: {
            initial: BN;
            rate: BN;
            index: number;
            max: number;
            min: number;
        };
    };
}
export declare function fromDecoded(obj: any): types.PriceRuleKind;
export declare function fromJSON(obj: types.PriceRuleJSON): types.PriceRuleKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=PriceRule.d.ts.map