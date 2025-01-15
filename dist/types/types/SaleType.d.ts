import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface NormalJSON {
    kind: "Normal";
}
export declare class Normal {
    static readonly discriminator = 0;
    static readonly kind = "Normal";
    readonly discriminator = 0;
    readonly kind = "Normal";
    toJSON(): NormalJSON;
    toEncodable(): {
        Normal: {};
    };
}
export interface NoMarketFeeJSON {
    kind: "NoMarketFee";
}
export declare class NoMarketFee {
    static readonly discriminator = 1;
    static readonly kind = "NoMarketFee";
    readonly discriminator = 1;
    readonly kind = "NoMarketFee";
    toJSON(): NoMarketFeeJSON;
    toEncodable(): {
        NoMarketFee: {};
    };
}
export declare function fromDecoded(obj: any): types.SaleTypeKind;
export declare function fromJSON(obj: types.SaleTypeJSON): types.SaleTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=SaleType.d.ts.map