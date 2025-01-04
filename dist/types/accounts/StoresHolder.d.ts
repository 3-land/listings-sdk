import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface StoresHolderFields {
    class: types.AccountClassKind;
    slot: BN;
    creator: PublicKey;
    count: BN;
    defaultGlobalFee: types.GlobalFeeFields | null;
}
export interface StoresHolderJSON {
    class: types.AccountClassJSON;
    slot: string;
    creator: string;
    count: string;
    defaultGlobalFee: types.GlobalFeeJSON | null;
}
export declare class StoresHolder {
    readonly class: types.AccountClassKind;
    readonly slot: BN;
    readonly creator: PublicKey;
    readonly count: BN;
    readonly defaultGlobalFee: types.GlobalFee | null;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: StoresHolderFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<StoresHolder | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<StoresHolder | null>>;
    static decode(data: Buffer): StoresHolder;
    toJSON(): StoresHolderJSON;
    static fromJSON(obj: StoresHolderJSON): StoresHolder;
}
//# sourceMappingURL=StoresHolder.d.ts.map