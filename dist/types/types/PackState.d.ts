import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface ClosedJSON {
    kind: "Closed";
}
export declare class Closed {
    static readonly discriminator = 0;
    static readonly kind = "Closed";
    readonly discriminator = 0;
    readonly kind = "Closed";
    toJSON(): ClosedJSON;
    toEncodable(): {
        Closed: {};
    };
}
export interface OpenedJSON {
    kind: "Opened";
}
export declare class Opened {
    static readonly discriminator = 1;
    static readonly kind = "Opened";
    readonly discriminator = 1;
    readonly kind = "Opened";
    toJSON(): OpenedJSON;
    toEncodable(): {
        Opened: {};
    };
}
export interface UnassignedJSON {
    kind: "Unassigned";
}
export declare class Unassigned {
    static readonly discriminator = 2;
    static readonly kind = "Unassigned";
    readonly discriminator = 2;
    readonly kind = "Unassigned";
    toJSON(): UnassignedJSON;
    toEncodable(): {
        Unassigned: {};
    };
}
export declare function fromDecoded(obj: any): types.PackStateKind;
export declare function fromJSON(obj: types.PackStateJSON): types.PackStateKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=PackState.d.ts.map