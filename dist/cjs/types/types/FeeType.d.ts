import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface AllMintsJSON {
    kind: "AllMints";
}
export declare class AllMints {
    static readonly discriminator = 0;
    static readonly kind = "AllMints";
    readonly discriminator = 0;
    readonly kind = "AllMints";
    toJSON(): AllMintsJSON;
    toEncodable(): {
        AllMints: {};
    };
}
export interface PricedMintsOnlyJSON {
    kind: "PricedMintsOnly";
}
export declare class PricedMintsOnly {
    static readonly discriminator = 1;
    static readonly kind = "PricedMintsOnly";
    readonly discriminator = 1;
    readonly kind = "PricedMintsOnly";
    toJSON(): PricedMintsOnlyJSON;
    toEncodable(): {
        PricedMintsOnly: {};
    };
}
export interface SkipBurnMintsJSON {
    kind: "SkipBurnMints";
}
export declare class SkipBurnMints {
    static readonly discriminator = 2;
    static readonly kind = "SkipBurnMints";
    readonly discriminator = 2;
    readonly kind = "SkipBurnMints";
    toJSON(): SkipBurnMintsJSON;
    toEncodable(): {
        SkipBurnMints: {};
    };
}
export declare function fromDecoded(obj: any): types.FeeTypeKind;
export declare function fromJSON(obj: types.FeeTypeJSON): types.FeeTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=FeeType.d.ts.map