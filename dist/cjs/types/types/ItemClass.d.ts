import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface SingleJSON {
    kind: "Single";
}
export declare class Single {
    static readonly discriminator = 0;
    static readonly kind = "Single";
    readonly discriminator = 0;
    readonly kind = "Single";
    toJSON(): SingleJSON;
    toEncodable(): {
        Single: {};
    };
}
export interface PackJSON {
    kind: "Pack";
}
export declare class Pack {
    static readonly discriminator = 1;
    static readonly kind = "Pack";
    readonly discriminator = 1;
    readonly kind = "Pack";
    toJSON(): PackJSON;
    toEncodable(): {
        Pack: {};
    };
}
export declare function fromDecoded(obj: any): types.ItemClassKind;
export declare function fromJSON(obj: types.ItemClassJSON): types.ItemClassKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=ItemClass.d.ts.map