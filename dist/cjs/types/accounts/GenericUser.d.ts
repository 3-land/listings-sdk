import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface GenericUserFields {
    class: types.AccountClassKind;
    subApp: BN;
    holderHash: BN;
    category: BN;
    creator: PublicKey;
    lutAccount: PublicKey;
    subWallets: Array<PublicKey>;
    extended: number;
    flags: Array<number>;
    username: string;
    genericStore: Array<types.GenericStoreFields>;
    extra: Array<number>;
}
export interface GenericUserJSON {
    class: types.AccountClassJSON;
    subApp: string;
    holderHash: string;
    category: string;
    creator: string;
    lutAccount: string;
    subWallets: Array<string>;
    extended: number;
    flags: Array<number>;
    username: string;
    genericStore: Array<types.GenericStoreJSON>;
    extra: Array<number>;
}
export declare class GenericUser {
    readonly class: types.AccountClassKind;
    readonly subApp: BN;
    readonly holderHash: BN;
    readonly category: BN;
    readonly creator: PublicKey;
    readonly lutAccount: PublicKey;
    readonly subWallets: Array<PublicKey>;
    readonly extended: number;
    readonly flags: Array<number>;
    readonly username: string;
    readonly genericStore: Array<types.GenericStore>;
    readonly extra: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: GenericUserFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<GenericUser | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<GenericUser | null>>;
    static decode(data: Buffer): GenericUser;
    toJSON(): GenericUserJSON;
    static fromJSON(obj: GenericUserJSON): GenericUser;
}
//# sourceMappingURL=GenericUser.d.ts.map