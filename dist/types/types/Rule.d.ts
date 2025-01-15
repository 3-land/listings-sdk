import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export type UnlocksAfterFields = {
    rule: types.ActionAfterKind;
};
export type UnlocksAfterValue = {
    rule: types.ActionAfterKind;
};
export interface UnlocksAfterJSON {
    kind: "UnlocksAfter";
    value: {
        rule: types.ActionAfterJSON;
    };
}
export declare class UnlocksAfter {
    static readonly discriminator = 0;
    static readonly kind = "UnlocksAfter";
    readonly discriminator = 0;
    readonly kind = "UnlocksAfter";
    readonly value: UnlocksAfterValue;
    constructor(value: UnlocksAfterFields);
    toJSON(): UnlocksAfterJSON;
    toEncodable(): {
        UnlocksAfter: {
            rule: {
                MintingOut: {};
            } | {
                Supply: {
                    limit: number;
                };
            } | {
                Hours: {
                    hours: number;
                };
            } | {
                SellingOut: {};
            };
        };
    };
}
export type UnwrapsAfterFields = {
    rule: types.ActionAfterKind;
};
export type UnwrapsAfterValue = {
    rule: types.ActionAfterKind;
};
export interface UnwrapsAfterJSON {
    kind: "UnwrapsAfter";
    value: {
        rule: types.ActionAfterJSON;
    };
}
export declare class UnwrapsAfter {
    static readonly discriminator = 1;
    static readonly kind = "UnwrapsAfter";
    readonly discriminator = 1;
    readonly kind = "UnwrapsAfter";
    readonly value: UnwrapsAfterValue;
    constructor(value: UnwrapsAfterFields);
    toJSON(): UnwrapsAfterJSON;
    toEncodable(): {
        UnwrapsAfter: {
            rule: {
                MintingOut: {};
            } | {
                Supply: {
                    limit: number;
                };
            } | {
                Hours: {
                    hours: number;
                };
            } | {
                SellingOut: {};
            };
        };
    };
}
export type WrappedSourceFields = {
    rule: types.WrappedSourceFields;
};
export type WrappedSourceValue = {
    rule: types.WrappedSource;
};
export interface WrappedSourceJSON {
    kind: "WrappedSource";
    value: {
        rule: types.WrappedSourceJSON;
    };
}
export declare class WrappedSource {
    static readonly discriminator = 2;
    static readonly kind = "WrappedSource";
    readonly discriminator = 2;
    readonly kind = "WrappedSource";
    readonly value: WrappedSourceValue;
    constructor(value: WrappedSourceFields);
    toJSON(): WrappedSourceJSON;
    toEncodable(): {
        WrappedSource: {
            rule: {
                pool: PublicKey;
                amount: BN;
                distribution: number;
                track: number;
            };
        };
    };
}
export type WrappedDestinyFields = {
    rule: types.WrappedDestinyFields;
};
export type WrappedDestinyValue = {
    rule: types.WrappedDestiny;
};
export interface WrappedDestinyJSON {
    kind: "WrappedDestiny";
    value: {
        rule: types.WrappedDestinyJSON;
    };
}
export declare class WrappedDestiny {
    static readonly discriminator = 3;
    static readonly kind = "WrappedDestiny";
    readonly discriminator = 3;
    readonly kind = "WrappedDestiny";
    readonly value: WrappedDestinyValue;
    constructor(value: WrappedDestinyFields);
    toJSON(): WrappedDestinyJSON;
    toEncodable(): {
        WrappedDestiny: {
            rule: {
                pool: PublicKey;
                destinyType: number;
                flag1: number;
            };
        };
    };
}
export declare function fromDecoded(obj: any): types.RuleKind;
export declare function fromJSON(obj: types.RuleJSON): types.RuleKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=Rule.d.ts.map