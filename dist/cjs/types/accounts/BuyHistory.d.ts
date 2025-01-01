import { PublicKey, Connection } from "@solana/web3.js";
import * as types from "../types";
export interface BuyHistoryFields {
    class: types.AccountClassKind;
    buyType: types.BuyHistoryClassKind;
    owner: PublicKey;
    item: PublicKey;
    store: PublicKey;
}
export interface BuyHistoryJSON {
    class: types.AccountClassJSON;
    buyType: types.BuyHistoryClassJSON;
    owner: string;
    item: string;
    store: string;
}
export declare class BuyHistory {
    readonly class: types.AccountClassKind;
    readonly buyType: types.BuyHistoryClassKind;
    readonly owner: PublicKey;
    readonly item: PublicKey;
    readonly store: PublicKey;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: BuyHistoryFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<BuyHistory | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<BuyHistory | null>>;
    static decode(data: Buffer): BuyHistory;
    toJSON(): BuyHistoryJSON;
    static fromJSON(obj: BuyHistoryJSON): BuyHistory;
}
//# sourceMappingURL=BuyHistory.d.ts.map