import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface CardFields {
    class: types.AccountClassKind;
    globalState: types.GlobalStateKind;
    store: PublicKey;
    creator: PublicKey;
    holder: PublicKey;
    hash: BN;
    page: BN;
    manager: PublicKey;
    index: number;
    hashTraits: BN;
    created: number;
    reserved: Array<number>;
    item: types.ItemFields;
}
export interface CardJSON {
    class: types.AccountClassJSON;
    globalState: types.GlobalStateJSON;
    store: string;
    creator: string;
    holder: string;
    hash: string;
    page: string;
    manager: string;
    index: number;
    hashTraits: string;
    created: number;
    reserved: Array<number>;
    item: types.ItemJSON;
}
export declare class Card {
    readonly class: types.AccountClassKind;
    readonly globalState: types.GlobalStateKind;
    readonly store: PublicKey;
    readonly creator: PublicKey;
    readonly holder: PublicKey;
    readonly hash: BN;
    readonly page: BN;
    readonly manager: PublicKey;
    readonly index: number;
    readonly hashTraits: BN;
    readonly created: number;
    readonly reserved: Array<number>;
    readonly item: types.Item;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: CardFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<Card | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<Card | null>>;
    static decode(data: Buffer): Card;
    toJSON(): CardJSON;
    static fromJSON(obj: CardJSON): Card;
}
//# sourceMappingURL=Card.d.ts.map