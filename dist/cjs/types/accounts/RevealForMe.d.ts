import { PublicKey, Connection } from "@solana/web3.js";
import * as types from "../types";
export interface RevealForMeFields {
    class: types.AccountClassKind;
    storeHalfHash: Array<number>;
    state: number;
    creator: PublicKey;
    nft: PublicKey;
    random: number;
    data: Uint8Array;
}
export interface RevealForMeJSON {
    class: types.AccountClassJSON;
    storeHalfHash: Array<number>;
    state: number;
    creator: string;
    nft: string;
    random: number;
    data: Array<number>;
}
export declare class RevealForMe {
    readonly class: types.AccountClassKind;
    readonly storeHalfHash: Array<number>;
    readonly state: number;
    readonly creator: PublicKey;
    readonly nft: PublicKey;
    readonly random: number;
    readonly data: Uint8Array;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: RevealForMeFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<RevealForMe | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<RevealForMe | null>>;
    static decode(data: Buffer): RevealForMe;
    toJSON(): RevealForMeJSON;
    static fromJSON(obj: RevealForMeJSON): RevealForMe;
}
//# sourceMappingURL=RevealForMe.d.ts.map