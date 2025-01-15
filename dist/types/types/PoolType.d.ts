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
export interface TokenJSON {
    kind: "Token";
}
export declare class Token {
    static readonly discriminator = 1;
    static readonly kind = "Token";
    readonly discriminator = 1;
    readonly kind = "Token";
    toJSON(): TokenJSON;
    toEncodable(): {
        Token: {};
    };
}
export interface MultiTokenJSON {
    kind: "MultiToken";
}
export declare class MultiToken {
    static readonly discriminator = 2;
    static readonly kind = "MultiToken";
    readonly discriminator = 2;
    readonly kind = "MultiToken";
    toJSON(): MultiTokenJSON;
    toEncodable(): {
        MultiToken: {};
    };
}
export declare function fromDecoded(obj: any): types.PoolTypeKind;
export declare function fromJSON(obj: types.PoolTypeJSON): types.PoolTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=PoolType.d.ts.map