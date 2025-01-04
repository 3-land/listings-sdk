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
export interface NameJSON {
    kind: "Name";
}
export declare class Name {
    static readonly discriminator = 1;
    static readonly kind = "Name";
    readonly discriminator = 1;
    readonly kind = "Name";
    toJSON(): NameJSON;
    toEncodable(): {
        Name: {};
    };
}
export interface UrlJSON {
    kind: "Url";
}
export declare class Url {
    static readonly discriminator = 2;
    static readonly kind = "Url";
    readonly discriminator = 2;
    readonly kind = "Url";
    toJSON(): UrlJSON;
    toEncodable(): {
        Url: {};
    };
}
export declare function fromDecoded(obj: any): types.EditionStoreTypeKind;
export declare function fromJSON(obj: types.EditionStoreTypeJSON): types.EditionStoreTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=EditionStoreType.d.ts.map