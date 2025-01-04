import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface BurnJSON {
    kind: "Burn";
}
export declare class Burn {
    static readonly discriminator = 0;
    static readonly kind = "Burn";
    readonly discriminator = 0;
    readonly kind = "Burn";
    toJSON(): BurnJSON;
    toEncodable(): {
        Burn: {};
    };
}
export interface MultipleJSON {
    kind: "Multiple";
}
export declare class Multiple {
    static readonly discriminator = 1;
    static readonly kind = "Multiple";
    readonly discriminator = 1;
    readonly kind = "Multiple";
    toJSON(): MultipleJSON;
    toEncodable(): {
        Multiple: {};
    };
}
export interface SingleJSON {
    kind: "Single";
}
export declare class Single {
    static readonly discriminator = 2;
    static readonly kind = "Single";
    readonly discriminator = 2;
    readonly kind = "Single";
    toJSON(): SingleJSON;
    toEncodable(): {
        Single: {};
    };
}
export declare function fromDecoded(obj: any): types.UseMethodKind;
export declare function fromJSON(obj: types.UseMethodJSON): types.UseMethodKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=UseMethod.d.ts.map