import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface RandomDirectJSON {
    kind: "RandomDirect";
}
export declare class RandomDirect {
    static readonly discriminator = 0;
    static readonly kind = "RandomDirect";
    readonly discriminator = 0;
    readonly kind = "RandomDirect";
    toJSON(): RandomDirectJSON;
    toEncodable(): {
        RandomDirect: {};
    };
}
export interface RandomPackJSON {
    kind: "RandomPack";
}
export declare class RandomPack {
    static readonly discriminator = 1;
    static readonly kind = "RandomPack";
    readonly discriminator = 1;
    readonly kind = "RandomPack";
    toJSON(): RandomPackJSON;
    toEncodable(): {
        RandomPack: {};
    };
}
export interface BundleJSON {
    kind: "Bundle";
}
export declare class Bundle {
    static readonly discriminator = 2;
    static readonly kind = "Bundle";
    readonly discriminator = 2;
    readonly kind = "Bundle";
    toJSON(): BundleJSON;
    toEncodable(): {
        Bundle: {};
    };
}
export declare function fromDecoded(obj: any): types.PackTypeKind;
export declare function fromJSON(obj: types.PackTypeJSON): types.PackTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=PackType.d.ts.map