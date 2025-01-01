import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface NoneJSON {
    kind: "None";
}
export declare class None {
    static readonly discriminator = 0;
    static readonly kind = "None";
    readonly discriminator = 0;
    readonly kind = "None";
    toJSON(): NoneJSON;
    toEncodable(): {
        None: {};
    };
}
export type RevealerFields = {
    random: number;
};
export type RevealerValue = {
    random: number;
};
export interface RevealerJSON {
    kind: "Revealer";
    value: {
        random: number;
    };
}
export declare class Revealer {
    static readonly discriminator = 1;
    static readonly kind = "Revealer";
    readonly discriminator = 1;
    readonly kind = "Revealer";
    readonly value: RevealerValue;
    constructor(value: RevealerFields);
    toJSON(): RevealerJSON;
    toEncodable(): {
        Revealer: {
            random: number;
        };
    };
}
export declare function fromDecoded(obj: any): types.ExtraParameterKind;
export declare function fromJSON(obj: types.ExtraParameterJSON): types.ExtraParameterKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=ExtraParameter.d.ts.map