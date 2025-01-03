import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface StoreConfigFields {
    fee: BN;
    feePercentage: number;
    feeType: types.FeeTypeKind;
    trust: PublicKey;
    rules: Array<types.StoreRuleKind>;
}
export interface StoreConfigJSON {
    fee: string;
    feePercentage: number;
    feeType: types.FeeTypeJSON;
    trust: string;
    rules: Array<types.StoreRuleJSON>;
}
export declare class StoreConfig {
    readonly fee: BN;
    readonly feePercentage: number;
    readonly feeType: types.FeeTypeKind;
    readonly trust: PublicKey;
    readonly rules: Array<types.StoreRuleKind>;
    constructor(fields: StoreConfigFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.StoreConfig;
    static toEncodable(fields: StoreConfigFields): {
        fee: BN;
        feePercentage: number;
        feeType: {
            AllMints: {};
        } | {
            PricedMintsOnly: {};
        } | {
            SkipBurnMints: {};
        };
        trust: PublicKey;
        rules: ({
            ListingPerWallet: {
                config: {
                    amount: number;
                };
            };
        } | {
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
        })[];
    };
    toJSON(): StoreConfigJSON;
    static fromJSON(obj: StoreConfigJSON): StoreConfig;
    toEncodable(): {
        fee: BN;
        feePercentage: number;
        feeType: {
            AllMints: {};
        } | {
            PricedMintsOnly: {};
        } | {
            SkipBurnMints: {};
        };
        trust: PublicKey;
        rules: ({
            ListingPerWallet: {
                config: {
                    amount: number;
                };
            };
        } | {
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
        })[];
    };
}
//# sourceMappingURL=StoreConfig.d.ts.map