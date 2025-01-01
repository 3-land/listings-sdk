import * as types from "../types";
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
export declare function fromDecoded(obj: any): types.GeneralStoreKind;
export declare function fromJSON(obj: types.GeneralStoreJSON): types.GeneralStoreKind;
export declare function layout(property?: string): any;
