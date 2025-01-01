import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface CollectionBurnJSON {
    kind: "CollectionBurn";
}
export declare class CollectionBurn {
    static readonly discriminator = 0;
    static readonly kind = "CollectionBurn";
    readonly discriminator = 0;
    readonly kind = "CollectionBurn";
    toJSON(): CollectionBurnJSON;
    toEncodable(): {
        CollectionBurn: {};
    };
}
export declare function fromDecoded(obj: any): types.BurnTypeBurnKind;
export declare function fromJSON(obj: types.BurnTypeBurnJSON): types.BurnTypeBurnKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=BurnTypeBurn.d.ts.map