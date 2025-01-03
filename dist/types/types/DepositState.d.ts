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
export interface BurningJSON {
    kind: "Burning";
}
export declare class Burning {
    static readonly discriminator = 1;
    static readonly kind = "Burning";
    readonly discriminator = 1;
    readonly kind = "Burning";
    toJSON(): BurningJSON;
    toEncodable(): {
        Burning: {};
    };
}
export declare function fromDecoded(obj: any): types.DepositStateKind;
export declare function fromJSON(obj: types.DepositStateJSON): types.DepositStateKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=DepositState.d.ts.map