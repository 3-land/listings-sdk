import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface UnclaimedJSON {
    kind: "Unclaimed";
}
export declare class Unclaimed {
    static readonly discriminator = 0;
    static readonly kind = "Unclaimed";
    readonly discriminator = 0;
    readonly kind = "Unclaimed";
    toJSON(): UnclaimedJSON;
    toEncodable(): {
        Unclaimed: {};
    };
}
export interface ClaimingJSON {
    kind: "Claiming";
}
export declare class Claiming {
    static readonly discriminator = 1;
    static readonly kind = "Claiming";
    readonly discriminator = 1;
    readonly kind = "Claiming";
    toJSON(): ClaimingJSON;
    toEncodable(): {
        Claiming: {};
    };
}
export interface ClaimedJSON {
    kind: "Claimed";
}
export declare class Claimed {
    static readonly discriminator = 2;
    static readonly kind = "Claimed";
    readonly discriminator = 2;
    readonly kind = "Claimed";
    toJSON(): ClaimedJSON;
    toEncodable(): {
        Claimed: {};
    };
}
export declare function fromDecoded(obj: any): types.PackOpenHolderStateKind;
export declare function fromJSON(obj: types.PackOpenHolderStateJSON): types.PackOpenHolderStateKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=PackOpenHolderState.d.ts.map