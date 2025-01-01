import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface CnftJSON {
    kind: "Cnft";
}
export declare class Cnft {
    static readonly discriminator = 0;
    static readonly kind = "Cnft";
    readonly discriminator = 0;
    readonly kind = "Cnft";
    toJSON(): CnftJSON;
    toEncodable(): {
        Cnft: {};
    };
}
export interface NftJSON {
    kind: "Nft";
}
export declare class Nft {
    static readonly discriminator = 1;
    static readonly kind = "Nft";
    readonly discriminator = 1;
    readonly kind = "Nft";
    toJSON(): NftJSON;
    toEncodable(): {
        Nft: {};
    };
}
export declare function fromDecoded(obj: any): types.DepositFormatKind;
export declare function fromJSON(obj: types.DepositFormatJSON): types.DepositFormatKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=DepositFormat.d.ts.map