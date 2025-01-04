import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface NewJSON {
    kind: "New";
}
export declare class New {
    static readonly discriminator = 0;
    static readonly kind = "New";
    readonly discriminator = 0;
    readonly kind = "New";
    toJSON(): NewJSON;
    toEncodable(): {
        New: {};
    };
}
export interface NoneJSON {
    kind: "None";
}
export declare class None {
    static readonly discriminator = 1;
    static readonly kind = "None";
    readonly discriminator = 1;
    readonly kind = "None";
    toJSON(): NoneJSON;
    toEncodable(): {
        None: {};
    };
}
export interface FirstJSON {
    kind: "First";
}
export declare class First {
    static readonly discriminator = 2;
    static readonly kind = "First";
    readonly discriminator = 2;
    readonly kind = "First";
    toJSON(): FirstJSON;
    toEncodable(): {
        First: {};
    };
}
export interface TenJSON {
    kind: "Ten";
}
export declare class Ten {
    static readonly discriminator = 3;
    static readonly kind = "Ten";
    readonly discriminator = 3;
    readonly kind = "Ten";
    toJSON(): TenJSON;
    toEncodable(): {
        Ten: {};
    };
}
export interface TwentyFiveJSON {
    kind: "TwentyFive";
}
export declare class TwentyFive {
    static readonly discriminator = 4;
    static readonly kind = "TwentyFive";
    readonly discriminator = 4;
    readonly kind = "TwentyFive";
    toJSON(): TwentyFiveJSON;
    toEncodable(): {
        TwentyFive: {};
    };
}
export interface HundredJSON {
    kind: "Hundred";
}
export declare class Hundred {
    static readonly discriminator = 5;
    static readonly kind = "Hundred";
    readonly discriminator = 5;
    readonly kind = "Hundred";
    toJSON(): HundredJSON;
    toEncodable(): {
        Hundred: {};
    };
}
export interface ThousandJSON {
    kind: "Thousand";
}
export declare class Thousand {
    static readonly discriminator = 6;
    static readonly kind = "Thousand";
    readonly discriminator = 6;
    readonly kind = "Thousand";
    toJSON(): ThousandJSON;
    toEncodable(): {
        Thousand: {};
    };
}
export interface TenThousandJSON {
    kind: "TenThousand";
}
export declare class TenThousand {
    static readonly discriminator = 7;
    static readonly kind = "TenThousand";
    readonly discriminator = 7;
    readonly kind = "TenThousand";
    toJSON(): TenThousandJSON;
    toEncodable(): {
        TenThousand: {};
    };
}
export interface HundredThousandJSON {
    kind: "HundredThousand";
}
export declare class HundredThousand {
    static readonly discriminator = 8;
    static readonly kind = "HundredThousand";
    readonly discriminator = 8;
    readonly kind = "HundredThousand";
    toJSON(): HundredThousandJSON;
    toEncodable(): {
        HundredThousand: {};
    };
}
export interface MillionJSON {
    kind: "Million";
}
export declare class Million {
    static readonly discriminator = 9;
    static readonly kind = "Million";
    readonly discriminator = 9;
    readonly kind = "Million";
    toJSON(): MillionJSON;
    toEncodable(): {
        Million: {};
    };
}
export interface TenMillionJSON {
    kind: "TenMillion";
}
export declare class TenMillion {
    static readonly discriminator = 10;
    static readonly kind = "TenMillion";
    readonly discriminator = 10;
    readonly kind = "TenMillion";
    toJSON(): TenMillionJSON;
    toEncodable(): {
        TenMillion: {};
    };
}
export interface HundredMillionJSON {
    kind: "HundredMillion";
}
export declare class HundredMillion {
    static readonly discriminator = 11;
    static readonly kind = "HundredMillion";
    readonly discriminator = 11;
    readonly kind = "HundredMillion";
    toJSON(): HundredMillionJSON;
    toEncodable(): {
        HundredMillion: {};
    };
}
export interface BillionJSON {
    kind: "Billion";
}
export declare class Billion {
    static readonly discriminator = 12;
    static readonly kind = "Billion";
    readonly discriminator = 12;
    readonly kind = "Billion";
    toJSON(): BillionJSON;
    toEncodable(): {
        Billion: {};
    };
}
export interface TenBillionJSON {
    kind: "TenBillion";
}
export declare class TenBillion {
    static readonly discriminator = 13;
    static readonly kind = "TenBillion";
    readonly discriminator = 13;
    readonly kind = "TenBillion";
    toJSON(): TenBillionJSON;
    toEncodable(): {
        TenBillion: {};
    };
}
export interface HundrerBillionJSON {
    kind: "HundrerBillion";
}
export declare class HundrerBillion {
    static readonly discriminator = 14;
    static readonly kind = "HundrerBillion";
    readonly discriminator = 14;
    readonly kind = "HundrerBillion";
    toJSON(): HundrerBillionJSON;
    toEncodable(): {
        HundrerBillion: {};
    };
}
export interface TrillionJSON {
    kind: "Trillion";
}
export declare class Trillion {
    static readonly discriminator = 15;
    static readonly kind = "Trillion";
    readonly discriminator = 15;
    readonly kind = "Trillion";
    toJSON(): TrillionJSON;
    toEncodable(): {
        Trillion: {};
    };
}
export interface TenTrillionJSON {
    kind: "TenTrillion";
}
export declare class TenTrillion {
    static readonly discriminator = 16;
    static readonly kind = "TenTrillion";
    readonly discriminator = 16;
    readonly kind = "TenTrillion";
    toJSON(): TenTrillionJSON;
    toEncodable(): {
        TenTrillion: {};
    };
}
export interface HundredTrillionJSON {
    kind: "HundredTrillion";
}
export declare class HundredTrillion {
    static readonly discriminator = 17;
    static readonly kind = "HundredTrillion";
    readonly discriminator = 17;
    readonly kind = "HundredTrillion";
    toJSON(): HundredTrillionJSON;
    toEncodable(): {
        HundredTrillion: {};
    };
}
export interface HighestJSON {
    kind: "Highest";
}
export declare class Highest {
    static readonly discriminator = 18;
    static readonly kind = "Highest";
    readonly discriminator = 18;
    readonly kind = "Highest";
    toJSON(): HighestJSON;
    toEncodable(): {
        Highest: {};
    };
}
export interface BannedJSON {
    kind: "Banned";
}
export declare class Banned {
    static readonly discriminator = 19;
    static readonly kind = "Banned";
    readonly discriminator = 19;
    readonly kind = "Banned";
    toJSON(): BannedJSON;
    toEncodable(): {
        Banned: {};
    };
}
export declare function fromDecoded(obj: any): types.PopularityStateKind;
export declare function fromJSON(obj: types.PopularityStateJSON): types.PopularityStateKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=PopularityState.d.ts.map