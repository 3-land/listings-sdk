import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface NewJSON {
    kind: "New";
}
export declare class New {
    static readonly discriminator = 0;
    static readonly kind = "New";
    readonly discriminator = 0;
    readonly kind = "New";
    toJSON(): NewJSON;
    toEncodable(): {
        New: {};
    };
}
export interface ActiveJSON {
    kind: "Active";
}
export declare class Active {
    static readonly discriminator = 1;
    static readonly kind = "Active";
    readonly discriminator = 1;
    readonly kind = "Active";
    toJSON(): ActiveJSON;
    toEncodable(): {
        Active: {};
    };
}
export declare function fromDecoded(obj: any): types.TokenStateKind;
export declare function fromJSON(obj: types.TokenStateJSON): types.TokenStateKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=TokenState.d.ts.map