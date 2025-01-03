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
export interface InTXJSON {
    kind: "InTX";
}
export declare class InTX {
    static readonly discriminator = 1;
    static readonly kind = "InTX";
    readonly discriminator = 1;
    readonly kind = "InTX";
    toJSON(): InTXJSON;
    toEncodable(): {
        InTX: {};
    };
}
export interface ProgressedJSON {
    kind: "Progressed";
}
export declare class Progressed {
    static readonly discriminator = 2;
    static readonly kind = "Progressed";
    readonly discriminator = 2;
    readonly kind = "Progressed";
    toJSON(): ProgressedJSON;
    toEncodable(): {
        Progressed: {};
    };
}
export declare function fromDecoded(obj: any): types.BurnTypeKind;
export declare function fromJSON(obj: types.BurnTypeJSON): types.BurnTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=BurnType.d.ts.map