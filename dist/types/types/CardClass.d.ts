import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface NormalJSON {
    kind: "Normal";
}
export declare class Normal {
    static readonly discriminator = 0;
    static readonly kind = "Normal";
    readonly discriminator = 0;
    readonly kind = "Normal";
    toJSON(): NormalJSON;
    toEncodable(): {
        Normal: {};
    };
}
export declare function fromDecoded(obj: any): types.CardClassKind;
export declare function fromJSON(obj: types.CardClassJSON): types.CardClassKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=CardClass.d.ts.map