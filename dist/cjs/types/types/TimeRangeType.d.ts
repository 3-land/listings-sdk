import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface BetweenHoursJSON {
    kind: "BetweenHours";
}
export declare class BetweenHours {
    static readonly discriminator = 0;
    static readonly kind = "BetweenHours";
    readonly discriminator = 0;
    readonly kind = "BetweenHours";
    toJSON(): BetweenHoursJSON;
    toEncodable(): {
        BetweenHours: {};
    };
}
export interface BetweenDaysJSON {
    kind: "BetweenDays";
}
export declare class BetweenDays {
    static readonly discriminator = 1;
    static readonly kind = "BetweenDays";
    readonly discriminator = 1;
    readonly kind = "BetweenDays";
    toJSON(): BetweenDaysJSON;
    toEncodable(): {
        BetweenDays: {};
    };
}
export interface BetweenHoursNegateJSON {
    kind: "BetweenHoursNegate";
}
export declare class BetweenHoursNegate {
    static readonly discriminator = 2;
    static readonly kind = "BetweenHoursNegate";
    readonly discriminator = 2;
    readonly kind = "BetweenHoursNegate";
    toJSON(): BetweenHoursNegateJSON;
    toEncodable(): {
        BetweenHoursNegate: {};
    };
}
export declare function fromDecoded(obj: any): types.TimeRangeTypeKind;
export declare function fromJSON(obj: types.TimeRangeTypeJSON): types.TimeRangeTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=TimeRangeType.d.ts.map