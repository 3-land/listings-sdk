import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface OriginalJSON {
    kind: "Original";
}
export declare class Original {
    static readonly discriminator = 0;
    static readonly kind = "Original";
    readonly discriminator = 0;
    readonly kind = "Original";
    toJSON(): OriginalJSON;
    toEncodable(): {
        Original: {};
    };
}
export interface Token2022JSON {
    kind: "Token2022";
}
export declare class Token2022 {
    static readonly discriminator = 1;
    static readonly kind = "Token2022";
    readonly discriminator = 1;
    readonly kind = "Token2022";
    toJSON(): Token2022JSON;
    toEncodable(): {
        Token2022: {};
    };
}
export declare function fromDecoded(obj: any): types.TokenProgramVersionKind;
export declare function fromJSON(obj: types.TokenProgramVersionJSON): types.TokenProgramVersionKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=TokenProgramVersion.d.ts.map