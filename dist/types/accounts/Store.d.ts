import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface StoreFields {
    class: types.AccountClassKind;
    holder: PublicKey;
    creator: PublicKey;
    page: BN;
    count: BN;
    live: BN;
    name: string;
    config: types.StoreConfigFields;
    storeId: number;
    globalFee: types.GlobalFeeFields | null;
    globalDeposit: BN;
    cacheHolder: Array<number>;
}
export interface StoreJSON {
    class: types.AccountClassJSON;
    holder: string;
    creator: string;
    page: string;
    count: string;
    live: string;
    name: string;
    config: types.StoreConfigJSON;
    storeId: number;
    globalFee: types.GlobalFeeJSON | null;
    globalDeposit: string;
    cacheHolder: Array<number>;
}
export declare class Store {
    readonly class: types.AccountClassKind;
    readonly holder: PublicKey;
    readonly creator: PublicKey;
    readonly page: BN;
    readonly count: BN;
    readonly live: BN;
    readonly name: string;
    readonly config: types.StoreConfig;
    readonly storeId: number;
    readonly globalFee: types.GlobalFee | null;
    readonly globalDeposit: BN;
    readonly cacheHolder: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: StoreFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<Store | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<Store | null>>;
    static decode(data: Buffer): Store;
    toJSON(): StoreJSON;
    static fromJSON(obj: StoreJSON): Store;
}
//# sourceMappingURL=Store.d.ts.map