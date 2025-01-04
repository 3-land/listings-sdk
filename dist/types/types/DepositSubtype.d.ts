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
export interface ThreeJSON {
    kind: "Three";
}
export declare class Three {
    static readonly discriminator = 1;
    static readonly kind = "Three";
    readonly discriminator = 1;
    readonly kind = "Three";
    toJSON(): ThreeJSON;
    toEncodable(): {
        Three: {};
    };
}
export declare function fromDecoded(obj: any): types.DepositSubtypeKind;
export declare function fromJSON(obj: types.DepositSubtypeJSON): types.DepositSubtypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=DepositSubtype.d.ts.map