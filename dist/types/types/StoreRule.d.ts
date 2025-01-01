import * as types from "../types";
export type ListingPerWalletFields = {
    config: types.ListingPerWalletArgsFields;
};
export type ListingPerWalletValue = {
    config: types.ListingPerWalletArgs;
};
export interface ListingPerWalletJSON {
    kind: "ListingPerWallet";
    value: {
        config: types.ListingPerWalletArgsJSON;
    };
}
export declare class ListingPerWallet {
    static readonly discriminator = 0;
    static readonly kind = "ListingPerWallet";
    readonly discriminator = 0;
    readonly kind = "ListingPerWallet";
    readonly value: ListingPerWalletValue;
    constructor(value: ListingPerWalletFields);
    toJSON(): ListingPerWalletJSON;
    toEncodable(): {
        ListingPerWallet: {
            config: any;
        };
    };
}
export type AllowedCurrencyFields = {
    config: types.CurrencyTypeKind;
};
export type AllowedCurrencyValue = {
    config: types.CurrencyTypeKind;
};
export interface AllowedCurrencyJSON {
    kind: "AllowedCurrency";
    value: {
        config: types.CurrencyTypeJSON;
    };
}
export declare class AllowedCurrency {
    static readonly discriminator = 1;
    static readonly kind = "AllowedCurrency";
    readonly discriminator = 1;
    readonly kind = "AllowedCurrency";
    readonly value: AllowedCurrencyValue;
    constructor(value: AllowedCurrencyFields);
    toJSON(): AllowedCurrencyJSON;
    toEncodable(): {
        AllowedCurrency: {
            config: any;
        };
    };
}
export declare function fromDecoded(obj: any): types.StoreRuleKind;
export declare function fromJSON(obj: types.StoreRuleJSON): types.StoreRuleKind;
export declare function layout(property?: string): any;
