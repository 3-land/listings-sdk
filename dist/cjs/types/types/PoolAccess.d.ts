import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface CpiJSON {
    kind: "Cpi";
}
export declare class Cpi {
    static readonly discriminator = 0;
    static readonly kind = "Cpi";
    readonly discriminator = 0;
    readonly kind = "Cpi";
    toJSON(): CpiJSON;
    toEncodable(): {
        Cpi: {};
    };
}
export interface PublicJSON {
    kind: "Public";
}
export declare class Public {
    static readonly discriminator = 1;
    static readonly kind = "Public";
    readonly discriminator = 1;
    readonly kind = "Public";
    toJSON(): PublicJSON;
    toEncodable(): {
        Public: {};
    };
}
export declare function fromDecoded(obj: any): types.PoolAccessKind;
export declare function fromJSON(obj: types.PoolAccessJSON): types.PoolAccessKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=PoolAccess.d.ts.map