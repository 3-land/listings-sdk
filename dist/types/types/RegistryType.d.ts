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
export type WrappedPoolFields = {
    poolHash: BN;
};
export type WrappedPoolValue = {
    poolHash: BN;
};
export interface WrappedPoolJSON {
    kind: "WrappedPool";
    value: {
        poolHash: string;
    };
}
export declare class WrappedPool {
    static readonly discriminator = 1;
    static readonly kind = "WrappedPool";
    readonly discriminator = 1;
    readonly kind = "WrappedPool";
    readonly value: WrappedPoolValue;
    constructor(value: WrappedPoolFields);
    toJSON(): WrappedPoolJSON;
    toEncodable(): {
        WrappedPool: {
            poolHash: BN;
        };
    };
}
export declare function fromDecoded(obj: any): types.RegistryTypeKind;
export declare function fromJSON(obj: types.RegistryTypeJSON): types.RegistryTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=RegistryType.d.ts.map