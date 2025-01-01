import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface NonPendingJSON {
    kind: "NonPending";
}
export declare class NonPending {
    static readonly discriminator = 0;
    static readonly kind = "NonPending";
    readonly discriminator = 0;
    readonly kind = "NonPending";
    toJSON(): NonPendingJSON;
    toEncodable(): {
        NonPending: {};
    };
}
export interface PendingJSON {
    kind: "Pending";
}
export declare class Pending {
    static readonly discriminator = 1;
    static readonly kind = "Pending";
    readonly discriminator = 1;
    readonly kind = "Pending";
    toJSON(): PendingJSON;
    toEncodable(): {
        Pending: {};
    };
}
export declare function fromDecoded(obj: any): types.BurnStateKind;
export declare function fromJSON(obj: types.BurnStateJSON): types.BurnStateKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=BurnState.d.ts.map