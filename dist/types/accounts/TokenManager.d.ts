import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface TokenManagerFields {
    class: types.AccountClassKind;
    storeHash: BN;
    tokenType: types.TokenTypeKind;
    state: types.TokenStateKind;
    currency: PublicKey;
    creator: PublicKey;
    communityShare: number;
    name: string;
    base: BN;
    price: BN;
    supply: BN;
    created: BN;
    pool: BN;
    pending: BN;
    taxes: Array<number>;
    options: Array<number>;
    extra: Array<number>;
}
export interface TokenManagerJSON {
    class: types.AccountClassJSON;
    storeHash: string;
    tokenType: types.TokenTypeJSON;
    state: types.TokenStateJSON;
    currency: string;
    creator: string;
    communityShare: number;
    name: string;
    base: string;
    price: string;
    supply: string;
    created: string;
    pool: string;
    pending: string;
    taxes: Array<number>;
    options: Array<number>;
    extra: Array<number>;
}
export declare class TokenManager {
    readonly class: types.AccountClassKind;
    readonly storeHash: BN;
    readonly tokenType: types.TokenTypeKind;
    readonly state: types.TokenStateKind;
    readonly currency: PublicKey;
    readonly creator: PublicKey;
    readonly communityShare: number;
    readonly name: string;
    readonly base: BN;
    readonly price: BN;
    readonly supply: BN;
    readonly created: BN;
    readonly pool: BN;
    readonly pending: BN;
    readonly taxes: Array<number>;
    readonly options: Array<number>;
    readonly extra: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: TokenManagerFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<TokenManager | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<TokenManager | null>>;
    static decode(data: Buffer): TokenManager;
    toJSON(): TokenManagerJSON;
    static fromJSON(obj: TokenManagerJSON): TokenManager;
}
//# sourceMappingURL=TokenManager.d.ts.map