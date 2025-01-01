import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ThreeIdFields {
    class: types.AccountClassKind;
    holderHash: BN;
    creator: PublicKey;
    lutAccount: PublicKey;
    points1: BN;
    points2: BN;
    coin1: number;
    coin2: number;
    settings: Array<number>;
    subwallets: Array<PublicKey>;
    username: string;
    generalStore: Array<types.GeneralStoreKind>;
    extra: Array<number>;
}
export interface ThreeIdJSON {
    class: types.AccountClassJSON;
    holderHash: string;
    creator: string;
    lutAccount: string;
    points1: string;
    points2: string;
    coin1: number;
    coin2: number;
    settings: Array<number>;
    subwallets: Array<string>;
    username: string;
    generalStore: Array<types.GeneralStoreJSON>;
    extra: Array<number>;
}
export declare class ThreeId {
    readonly class: types.AccountClassKind;
    readonly holderHash: BN;
    readonly creator: PublicKey;
    readonly lutAccount: PublicKey;
    readonly points1: BN;
    readonly points2: BN;
    readonly coin1: number;
    readonly coin2: number;
    readonly settings: Array<number>;
    readonly subwallets: Array<PublicKey>;
    readonly username: string;
    readonly generalStore: Array<types.GeneralStoreKind>;
    readonly extra: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: ThreeIdFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<ThreeId | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<ThreeId | null>>;
    static decode(data: Buffer): ThreeId;
    toJSON(): ThreeIdJSON;
    static fromJSON(obj: ThreeIdJSON): ThreeId;
}
//# sourceMappingURL=ThreeId.d.ts.map