import { PublicKey, Connection } from "@solana/web3.js";
import * as types from "../types";
export interface PackOpenHolderFields {
    class: types.AccountClassKind;
    state: types.PackOpenHolderStateKind;
    pack: PublicKey;
    creator: PublicKey;
    claimer: PublicKey;
    packType: types.PackTypeKind;
    items: Array<types.SelectedCardFields>;
}
export interface PackOpenHolderJSON {
    class: types.AccountClassJSON;
    state: types.PackOpenHolderStateJSON;
    pack: string;
    creator: string;
    claimer: string;
    packType: types.PackTypeJSON;
    items: Array<types.SelectedCardJSON>;
}
export declare class PackOpenHolder {
    readonly class: types.AccountClassKind;
    readonly state: types.PackOpenHolderStateKind;
    readonly pack: PublicKey;
    readonly creator: PublicKey;
    readonly claimer: PublicKey;
    readonly packType: types.PackTypeKind;
    readonly items: Array<types.SelectedCard>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: PackOpenHolderFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<PackOpenHolder | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<PackOpenHolder | null>>;
    static decode(data: Buffer): PackOpenHolder;
    toJSON(): PackOpenHolderJSON;
    static fromJSON(obj: PackOpenHolderJSON): PackOpenHolder;
}
//# sourceMappingURL=PackOpenHolder.d.ts.map