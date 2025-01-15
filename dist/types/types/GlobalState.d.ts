import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface HiddenBySystemJSON {
    kind: "HiddenBySystem";
}
export declare class HiddenBySystem {
    static readonly discriminator = 0;
    static readonly kind = "HiddenBySystem";
    readonly discriminator = 0;
    readonly kind = "HiddenBySystem";
    toJSON(): HiddenBySystemJSON;
    toEncodable(): {
        HiddenBySystem: {};
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
export interface HiddenByUserJSON {
    kind: "HiddenByUser";
}
export declare class HiddenByUser {
    static readonly discriminator = 2;
    static readonly kind = "HiddenByUser";
    readonly discriminator = 2;
    readonly kind = "HiddenByUser";
    toJSON(): HiddenByUserJSON;
    toEncodable(): {
        HiddenByUser: {};
    };
}
export interface FlaggedPirateJSON {
    kind: "FlaggedPirate";
}
export declare class FlaggedPirate {
    static readonly discriminator = 3;
    static readonly kind = "FlaggedPirate";
    readonly discriminator = 3;
    readonly kind = "FlaggedPirate";
    toJSON(): FlaggedPirateJSON;
    toEncodable(): {
        FlaggedPirate: {};
    };
}
export interface WaitingGlobalApprovalJSON {
    kind: "WaitingGlobalApproval";
}
export declare class WaitingGlobalApproval {
    static readonly discriminator = 4;
    static readonly kind = "WaitingGlobalApproval";
    readonly discriminator = 4;
    readonly kind = "WaitingGlobalApproval";
    toJSON(): WaitingGlobalApprovalJSON;
    toEncodable(): {
        WaitingGlobalApproval: {};
    };
}
export declare function fromDecoded(obj: any): types.GlobalStateKind;
export declare function fromJSON(obj: types.GlobalStateJSON): types.GlobalStateKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=GlobalState.d.ts.map