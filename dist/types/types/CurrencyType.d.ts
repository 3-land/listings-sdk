import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface NativeJSON {
    kind: "Native";
}
export declare class Native {
    static readonly discriminator = 0;
    static readonly kind = "Native";
    readonly discriminator = 0;
    readonly kind = "Native";
    toJSON(): NativeJSON;
    toEncodable(): {
        Native: {};
    };
}
export type SplFields = {
    id: PublicKey;
};
export type SplValue = {
    id: PublicKey;
};
export interface SplJSON {
    kind: "Spl";
    value: {
        id: string;
    };
}
export declare class Spl {
    static readonly discriminator = 1;
    static readonly kind = "Spl";
    readonly discriminator = 1;
    readonly kind = "Spl";
    readonly value: SplValue;
    constructor(value: SplFields);
    toJSON(): SplJSON;
    toEncodable(): {
        Spl: {
            id: PublicKey;
        };
    };
}
export type CollectionFields = {
    id: PublicKey;
};
export type CollectionValue = {
    id: PublicKey;
};
export interface CollectionJSON {
    kind: "Collection";
    value: {
        id: string;
    };
}
export declare class Collection {
    static readonly discriminator = 2;
    static readonly kind = "Collection";
    readonly discriminator = 2;
    readonly kind = "Collection";
    readonly value: CollectionValue;
    constructor(value: CollectionFields);
    toJSON(): CollectionJSON;
    toEncodable(): {
        Collection: {
            id: PublicKey;
        };
    };
}
export type CreatorFields = {
    id: PublicKey;
};
export type CreatorValue = {
    id: PublicKey;
};
export interface CreatorJSON {
    kind: "Creator";
    value: {
        id: string;
    };
}
export declare class Creator {
    static readonly discriminator = 3;
    static readonly kind = "Creator";
    readonly discriminator = 3;
    readonly kind = "Creator";
    readonly value: CreatorValue;
    constructor(value: CreatorFields);
    toJSON(): CreatorJSON;
    toEncodable(): {
        Creator: {
            id: PublicKey;
        };
    };
}
export interface NoneJSON {
    kind: "None";
}
export declare class None {
    static readonly discriminator = 4;
    static readonly kind = "None";
    readonly discriminator = 4;
    readonly kind = "None";
    toJSON(): NoneJSON;
    toEncodable(): {
        None: {};
    };
}
export declare function fromDecoded(obj: any): types.CurrencyTypeKind;
export declare function fromJSON(obj: types.CurrencyTypeJSON): types.CurrencyTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=CurrencyType.d.ts.map