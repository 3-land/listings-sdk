import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface SaleConfigFields {
    prices: Array<types.PriceFields>;
    priceType: types.PriceRuleKind;
    rules: Array<types.RuleKind>;
    sendToVault: number;
    saleType: types.SaleTypeKind;
}
export interface SaleConfigJSON {
    prices: Array<types.PriceJSON>;
    priceType: types.PriceRuleJSON;
    rules: Array<types.RuleJSON>;
    sendToVault: number;
    saleType: types.SaleTypeJSON;
}
export declare class SaleConfig {
    readonly prices: Array<types.Price>;
    readonly priceType: types.PriceRuleKind;
    readonly rules: Array<types.RuleKind>;
    readonly sendToVault: number;
    readonly saleType: types.SaleTypeKind;
    constructor(fields: SaleConfigFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SaleConfig;
    static toEncodable(fields: SaleConfigFields): {
        prices: {
            amount: BN;
            priceType: {
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
        }[];
        priceType: {
            None: {};
        } | {
            And: {};
        } | {
            Or: {};
        } | {
            BondingLinear: {
                initial: BN;
                rate: BN;
                index: number;
                max: number;
                min: number;
            };
        };
        rules: ({
            UnlocksAfter: {
                rule: {
                    MintingOut: {};
                } | {
                    Supply: {
                        limit: number;
                    };
                } | {
                    Hours: {
                        hours: number;
                    };
                } | {
                    SellingOut: {};
                };
            };
        } | {
            UnwrapsAfter: {
                rule: {
                    MintingOut: {};
                } | {
                    Supply: {
                        limit: number;
                    };
                } | {
                    Hours: {
                        hours: number;
                    };
                } | {
                    SellingOut: {};
                };
            };
        } | {
            WrappedSource: {
                rule: {
                    pool: PublicKey;
                    amount: BN;
                    distribution: number;
                    track: number;
                };
            };
        } | {
            WrappedDestiny: {
                rule: {
                    pool: PublicKey;
                    destinyType: number;
                    flag1: number;
                };
            };
        })[];
        sendToVault: number;
        saleType: {
            Normal: {};
        } | {
            NoMarketFee: {};
        };
    };
    toJSON(): SaleConfigJSON;
    static fromJSON(obj: SaleConfigJSON): SaleConfig;
    toEncodable(): {
        prices: {
            amount: BN;
            priceType: {
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
        }[];
        priceType: {
            None: {};
        } | {
            And: {};
        } | {
            Or: {};
        } | {
            BondingLinear: {
                initial: BN;
                rate: BN;
                index: number;
                max: number;
                min: number;
            };
        };
        rules: ({
            UnlocksAfter: {
                rule: {
                    MintingOut: {};
                } | {
                    Supply: {
                        limit: number;
                    };
                } | {
                    Hours: {
                        hours: number;
                    };
                } | {
                    SellingOut: {};
                };
            };
        } | {
            UnwrapsAfter: {
                rule: {
                    MintingOut: {};
                } | {
                    Supply: {
                        limit: number;
                    };
                } | {
                    Hours: {
                        hours: number;
                    };
                } | {
                    SellingOut: {};
                };
            };
        } | {
            WrappedSource: {
                rule: {
                    pool: PublicKey;
                    amount: BN;
                    distribution: number;
                    track: number;
                };
            };
        } | {
            WrappedDestiny: {
                rule: {
                    pool: PublicKey;
                    destinyType: number;
                    flag1: number;
                };
            };
        })[];
        sendToVault: number;
        saleType: {
            Normal: {};
        } | {
            NoMarketFee: {};
        };
    };
}
//# sourceMappingURL=SaleConfig.d.ts.map