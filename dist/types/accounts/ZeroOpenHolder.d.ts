import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ZeroOpenHolderFields {
    class: types.AccountClassKind;
    storeHalfHash: Array<number>;
    state: types.PackOpenHolderStateKind;
    paidFee: number;
    pack: PublicKey;
    creator: PublicKey;
    claimer: PublicKey;
    randomBase: BN;
    packType: types.PackTypeKind;
    sendToVault: types.MemeVaultProofFields | null;
    items: Array<types.SelectedZeroCardFields>;
}
export interface ZeroOpenHolderJSON {
    class: types.AccountClassJSON;
    storeHalfHash: Array<number>;
    state: types.PackOpenHolderStateJSON;
    paidFee: number;
    pack: string;
    creator: string;
    claimer: string;
    randomBase: string;
    packType: types.PackTypeJSON;
    sendToVault: types.MemeVaultProofJSON | null;
    items: Array<types.SelectedZeroCardJSON>;
}
export declare class ZeroOpenHolder {
    readonly class: types.AccountClassKind;
    readonly storeHalfHash: Array<number>;
    readonly state: types.PackOpenHolderStateKind;
    readonly paidFee: number;
    readonly pack: PublicKey;
    readonly creator: PublicKey;
    readonly claimer: PublicKey;
    readonly randomBase: BN;
    readonly packType: types.PackTypeKind;
    readonly sendToVault: types.MemeVaultProof | null;
    readonly items: Array<types.SelectedZeroCard>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: ZeroOpenHolderFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<ZeroOpenHolder | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<ZeroOpenHolder | null>>;
    static decode(data: Buffer): ZeroOpenHolder;
    toJSON(): ZeroOpenHolderJSON;
    static fromJSON(obj: ZeroOpenHolderJSON): ZeroOpenHolder;
}
//# sourceMappingURL=ZeroOpenHolder.d.ts.map