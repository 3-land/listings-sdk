import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
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
            config: {
                amount: number;
            };
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
            config: {
                Native: {};
            } | {
                Spl: {
                    id: PublicKey;
                };
            } | {
                Collection: {
                    id: PublicKey;
                };
            } | {
                Creator: {
                    id: PublicKey;
                };
            } | {
                None: {};
            };
        };
    };
}
export declare function fromDecoded(obj: any): types.StoreRuleKind;
export declare function fromJSON(obj: types.StoreRuleJSON): types.StoreRuleKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=StoreRule.d.ts.map