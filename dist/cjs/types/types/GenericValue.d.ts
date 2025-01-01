import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
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
export type KeyFields = {
    value: PublicKey;
};
export type KeyValue = {
    value: PublicKey;
};
export interface KeyJSON {
    kind: "Key";
    value: {
        value: string;
    };
}
export declare class Key {
    static readonly discriminator = 1;
    static readonly kind = "Key";
    readonly discriminator = 1;
    readonly kind = "Key";
    readonly value: KeyValue;
    constructor(value: KeyFields);
    toJSON(): KeyJSON;
    toEncodable(): {
        Key: {
            value: PublicKey;
        };
    };
}
export type EightBytesFields = {
    value: BN;
};
export type EightBytesValue = {
    value: BN;
};
export interface EightBytesJSON {
    kind: "EightBytes";
    value: {
        value: string;
    };
}
export declare class EightBytes {
    static readonly discriminator = 2;
    static readonly kind = "EightBytes";
    readonly discriminator = 2;
    readonly kind = "EightBytes";
    readonly value: EightBytesValue;
    constructor(value: EightBytesFields);
    toJSON(): EightBytesJSON;
    toEncodable(): {
        EightBytes: {
            value: BN;
        };
    };
}
export declare function fromDecoded(obj: any): types.GenericValueKind;
export declare function fromJSON(obj: types.GenericValueJSON): types.GenericValueKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=GenericValue.d.ts.map