import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export type CoolDownToOpenFields = {
    seconds: number;
};
export type CoolDownToOpenValue = {
    seconds: number;
};
export interface CoolDownToOpenJSON {
    kind: "CoolDownToOpen";
    value: {
        seconds: number;
    };
}
export declare class CoolDownToOpen {
    static readonly discriminator = 0;
    static readonly kind = "CoolDownToOpen";
    readonly discriminator = 0;
    readonly kind = "CoolDownToOpen";
    readonly value: CoolDownToOpenValue;
    constructor(value: CoolDownToOpenFields);
    toJSON(): CoolDownToOpenJSON;
    toEncodable(): {
        CoolDownToOpen: {
            seconds: number;
        };
    };
}
export declare function fromDecoded(obj: any): types.PackRuleKind;
export declare function fromJSON(obj: types.PackRuleJSON): types.PackRuleKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=PackRule.d.ts.map