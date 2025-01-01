import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface NonFungibleJSON {
    kind: "NonFungible";
}
export declare class NonFungible {
    static readonly discriminator = 0;
    static readonly kind = "NonFungible";
    readonly discriminator = 0;
    readonly kind = "NonFungible";
    toJSON(): NonFungibleJSON;
    toEncodable(): {
        NonFungible: {};
    };
}
export interface FungibleAssetJSON {
    kind: "FungibleAsset";
}
export declare class FungibleAsset {
    static readonly discriminator = 1;
    static readonly kind = "FungibleAsset";
    readonly discriminator = 1;
    readonly kind = "FungibleAsset";
    toJSON(): FungibleAssetJSON;
    toEncodable(): {
        FungibleAsset: {};
    };
}
export interface FungibleJSON {
    kind: "Fungible";
}
export declare class Fungible {
    static readonly discriminator = 2;
    static readonly kind = "Fungible";
    readonly discriminator = 2;
    readonly kind = "Fungible";
    toJSON(): FungibleJSON;
    toEncodable(): {
        Fungible: {};
    };
}
export interface NonFungibleEditionJSON {
    kind: "NonFungibleEdition";
}
export declare class NonFungibleEdition {
    static readonly discriminator = 3;
    static readonly kind = "NonFungibleEdition";
    readonly discriminator = 3;
    readonly kind = "NonFungibleEdition";
    toJSON(): NonFungibleEditionJSON;
    toEncodable(): {
        NonFungibleEdition: {};
    };
}
export declare function fromDecoded(obj: any): types.TokenStandardKind;
export declare function fromJSON(obj: types.TokenStandardJSON): types.TokenStandardKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=TokenStandard.d.ts.map