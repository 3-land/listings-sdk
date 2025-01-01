import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface PackReceiptFields {
    class: types.AccountClassKind;
    cnft: PublicKey;
    pack: PublicKey;
    creator: PublicKey;
    state: types.PackStateKind;
    cardsInside: number;
    slot: BN;
    created: number;
}
export interface PackReceiptJSON {
    class: types.AccountClassJSON;
    cnft: string;
    pack: string;
    creator: string;
    state: types.PackStateJSON;
    cardsInside: number;
    slot: string;
    created: number;
}
export declare class PackReceipt {
    readonly class: types.AccountClassKind;
    readonly cnft: PublicKey;
    readonly pack: PublicKey;
    readonly creator: PublicKey;
    readonly state: types.PackStateKind;
    readonly cardsInside: number;
    readonly slot: BN;
    readonly created: number;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: PackReceiptFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<PackReceipt | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<PackReceipt | null>>;
    static decode(data: Buffer): PackReceipt;
    toJSON(): PackReceiptJSON;
    static fromJSON(obj: PackReceiptJSON): PackReceipt;
}
//# sourceMappingURL=PackReceipt.d.ts.map