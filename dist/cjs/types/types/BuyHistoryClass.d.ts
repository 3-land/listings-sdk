import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface SingleBuyV1JSON {
    kind: "SingleBuyV1";
}
export declare class SingleBuyV1 {
    static readonly discriminator = 0;
    static readonly kind = "SingleBuyV1";
    readonly discriminator = 0;
    readonly kind = "SingleBuyV1";
    toJSON(): SingleBuyV1JSON;
    toEncodable(): {
        SingleBuyV1: {};
    };
}
export interface PackBuyV1JSON {
    kind: "PackBuyV1";
}
export declare class PackBuyV1 {
    static readonly discriminator = 1;
    static readonly kind = "PackBuyV1";
    readonly discriminator = 1;
    readonly kind = "PackBuyV1";
    toJSON(): PackBuyV1JSON;
    toEncodable(): {
        PackBuyV1: {};
    };
}
export declare function fromDecoded(obj: any): types.BuyHistoryClassKind;
export declare function fromJSON(obj: types.BuyHistoryClassJSON): types.BuyHistoryClassKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=BuyHistoryClass.d.ts.map