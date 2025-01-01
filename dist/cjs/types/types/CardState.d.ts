import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface ActiveJSON {
    kind: "Active";
}
export declare class Active {
    static readonly discriminator = 0;
    static readonly kind = "Active";
    readonly discriminator = 0;
    readonly kind = "Active";
    toJSON(): ActiveJSON;
    toEncodable(): {
        Active: {};
    };
}
export interface HiddenJSON {
    kind: "Hidden";
}
export declare class Hidden {
    static readonly discriminator = 1;
    static readonly kind = "Hidden";
    readonly discriminator = 1;
    readonly kind = "Hidden";
    toJSON(): HiddenJSON;
    toEncodable(): {
        Hidden: {};
    };
}
export interface InactiveJSON {
    kind: "Inactive";
}
export declare class Inactive {
    static readonly discriminator = 2;
    static readonly kind = "Inactive";
    readonly discriminator = 2;
    readonly kind = "Inactive";
    toJSON(): InactiveJSON;
    toEncodable(): {
        Inactive: {};
    };
}
export interface RetiredJSON {
    kind: "Retired";
}
export declare class Retired {
    static readonly discriminator = 3;
    static readonly kind = "Retired";
    readonly discriminator = 3;
    readonly kind = "Retired";
    toJSON(): RetiredJSON;
    toEncodable(): {
        Retired: {};
    };
}
export interface SoldOutJSON {
    kind: "SoldOut";
}
export declare class SoldOut {
    static readonly discriminator = 4;
    static readonly kind = "SoldOut";
    readonly discriminator = 4;
    readonly kind = "SoldOut";
    toJSON(): SoldOutJSON;
    toEncodable(): {
        SoldOut: {};
    };
}
export interface NoneJSON {
    kind: "None";
}
export declare class None {
    static readonly discriminator = 5;
    static readonly kind = "None";
    readonly discriminator = 5;
    readonly kind = "None";
    toJSON(): NoneJSON;
    toEncodable(): {
        None: {};
    };
}
export interface NotReadyJSON {
    kind: "NotReady";
}
export declare class NotReady {
    static readonly discriminator = 6;
    static readonly kind = "NotReady";
    readonly discriminator = 6;
    readonly kind = "NotReady";
    toJSON(): NotReadyJSON;
    toEncodable(): {
        NotReady: {};
    };
}
export declare function fromDecoded(obj: any): types.CardStateKind;
export declare function fromJSON(obj: types.CardStateJSON): types.CardStateKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=CardState.d.ts.map