import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface BasicJSON {
    kind: "Basic";
}
export declare class Basic {
    static readonly discriminator = 0;
    static readonly kind = "Basic";
    readonly discriminator = 0;
    readonly kind = "Basic";
    toJSON(): BasicJSON;
    toEncodable(): {
        Basic: {};
    };
}
export interface OnlyUpJSON {
    kind: "OnlyUp";
}
export declare class OnlyUp {
    static readonly discriminator = 1;
    static readonly kind = "OnlyUp";
    readonly discriminator = 1;
    readonly kind = "OnlyUp";
    toJSON(): OnlyUpJSON;
    toEncodable(): {
        OnlyUp: {};
    };
}
export declare function fromDecoded(obj: any): types.TokenTypeKind;
export declare function fromJSON(obj: types.TokenTypeJSON): types.TokenTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=TokenType.d.ts.map