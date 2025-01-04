import { PublicKey, Connection } from "@solana/web3.js";
import * as types from "../types";
export interface PackContentFields {
    class: types.AccountClassKind;
    cards: PublicKey;
}
export interface PackContentJSON {
    class: types.AccountClassJSON;
    cards: string;
}
export declare class PackContent {
    readonly class: types.AccountClassKind;
    readonly cards: PublicKey;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: PackContentFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<PackContent | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<PackContent | null>>;
    static decode(data: Buffer): PackContent;
    toJSON(): PackContentJSON;
    static fromJSON(obj: PackContentJSON): PackContent;
}
//# sourceMappingURL=PackContent.d.ts.map