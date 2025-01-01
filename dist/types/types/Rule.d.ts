import * as types from "../types";
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
            rule: any;
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
            rule: any;
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
            rule: any;
        };
    };
}
export declare function fromDecoded(obj: any): types.RuleKind;
export declare function fromJSON(obj: types.RuleJSON): types.RuleKind;
export declare function layout(property?: string): any;
