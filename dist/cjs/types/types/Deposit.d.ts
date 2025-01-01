import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface DepositFields {
    depositType: types.DepositTypeKind;
    format: types.DepositFormatKind;
    interestHash: BN;
    proofSize: number;
}
export interface DepositJSON {
    depositType: types.DepositTypeJSON;
    format: types.DepositFormatJSON;
    interestHash: string;
    proofSize: number;
}
export declare class Deposit {
    readonly depositType: types.DepositTypeKind;
    readonly format: types.DepositFormatKind;
    readonly interestHash: BN;
    readonly proofSize: number;
    constructor(fields: DepositFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.Deposit;
    static toEncodable(fields: DepositFields): {
        depositType: {
            Creator: {
                creators: {
                    address: PublicKey;
                    verified: boolean;
                    share: number;
                }[];
            };
        } | {
            PdaCreator: {
                creators: {
                    address: PublicKey;
                    verified: boolean;
                    share: number;
                }[];
                hasher: {
                    seeds: {
                        seed: Buffer;
                    }[];
                    insertAt: number;
                    program: PublicKey;
                    bump: number;
                };
            };
        } | {
            Collection: {
                metadata: {
                    name: string;
                    symbol: string;
                    uri: string;
                    royalty: number;
                    collection: number;
                    creators: {
                        address: PublicKey;
                        verified: boolean;
                        share: number;
                    }[];
                };
                subtype: {
                    None: {};
                } | {
                    Three: {};
                };
            };
        };
        format: {
            Cnft: {};
        } | {
            Nft: {};
        };
        interestHash: BN;
        proofSize: number;
    };
    toJSON(): DepositJSON;
    static fromJSON(obj: DepositJSON): Deposit;
    toEncodable(): {
        depositType: {
            Creator: {
                creators: {
                    address: PublicKey;
                    verified: boolean;
                    share: number;
                }[];
            };
        } | {
            PdaCreator: {
                creators: {
                    address: PublicKey;
                    verified: boolean;
                    share: number;
                }[];
                hasher: {
                    seeds: {
                        seed: Buffer;
                    }[];
                    insertAt: number;
                    program: PublicKey;
                    bump: number;
                };
            };
        } | {
            Collection: {
                metadata: {
                    name: string;
                    symbol: string;
                    uri: string;
                    royalty: number;
                    collection: number;
                    creators: {
                        address: PublicKey;
                        verified: boolean;
                        share: number;
                    }[];
                };
                subtype: {
                    None: {};
                } | {
                    Three: {};
                };
            };
        };
        format: {
            Cnft: {};
        } | {
            Nft: {};
        };
        interestHash: BN;
        proofSize: number;
    };
}
