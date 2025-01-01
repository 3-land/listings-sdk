import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface AvailableJSON {
    kind: "Available";
}
export declare class Available {
    static readonly discriminator = 0;
    static readonly kind = "Available";
    readonly discriminator = 0;
    readonly kind = "Available";
    toJSON(): AvailableJSON;
    toEncodable(): {
        Available: {};
    };
}
export interface ClosedJSON {
    kind: "Closed";
}
export declare class Closed {
    static readonly discriminator = 1;
    static readonly kind = "Closed";
    readonly discriminator = 1;
    readonly kind = "Closed";
    toJSON(): ClosedJSON;
    toEncodable(): {
        Closed: {};
    };
}
export declare function fromDecoded(obj: any): types.PoolStateKind;
export declare function fromJSON(obj: types.PoolStateJSON): types.PoolStateKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=PoolState.d.ts.map