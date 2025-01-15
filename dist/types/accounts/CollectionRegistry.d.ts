import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface CollectionRegistryFields {
    class: types.AccountClassKind;
    storeHash: BN;
    currency: PublicKey;
    collection: PublicKey;
    donations: BN;
    date: types.IndexDateFields;
    filters: Array<number>;
    created: BN;
    sold: BN;
    earned: BN;
    collectors: BN;
}
export interface CollectionRegistryJSON {
    class: types.AccountClassJSON;
    storeHash: string;
    currency: string;
    collection: string;
    donations: string;
    date: types.IndexDateJSON;
    filters: Array<number>;
    created: string;
    sold: string;
    earned: string;
    collectors: string;
}
export declare class CollectionRegistry {
    readonly class: types.AccountClassKind;
    readonly storeHash: BN;
    readonly currency: PublicKey;
    readonly collection: PublicKey;
    readonly donations: BN;
    readonly date: types.IndexDate;
    readonly filters: Array<number>;
    readonly created: BN;
    readonly sold: BN;
    readonly earned: BN;
    readonly collectors: BN;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: CollectionRegistryFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<CollectionRegistry | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<CollectionRegistry | null>>;
    static decode(data: Buffer): CollectionRegistry;
    toJSON(): CollectionRegistryJSON;
    static fromJSON(obj: CollectionRegistryJSON): CollectionRegistry;
}
//# sourceMappingURL=CollectionRegistry.d.ts.map