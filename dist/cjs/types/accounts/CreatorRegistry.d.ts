import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface CreatorRegistryFields {
    class: types.AccountClassKind;
    storeHash: BN;
    currency: PublicKey;
    creator: PublicKey;
    donations: BN;
    date: types.IndexDateFields;
    filters: Array<number>;
    track: types.SaleTrackFields;
    lut: PublicKey;
}
export interface CreatorRegistryJSON {
    class: types.AccountClassJSON;
    storeHash: string;
    currency: string;
    creator: string;
    donations: string;
    date: types.IndexDateJSON;
    filters: Array<number>;
    track: types.SaleTrackJSON;
    lut: string;
}
export declare class CreatorRegistry {
    readonly class: types.AccountClassKind;
    readonly storeHash: BN;
    readonly currency: PublicKey;
    readonly creator: PublicKey;
    readonly donations: BN;
    readonly date: types.IndexDate;
    readonly filters: Array<number>;
    readonly track: types.SaleTrack;
    readonly lut: PublicKey;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: CreatorRegistryFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<CreatorRegistry | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<CreatorRegistry | null>>;
    static decode(data: Buffer): CreatorRegistry;
    toJSON(): CreatorRegistryJSON;
    static fromJSON(obj: CreatorRegistryJSON): CreatorRegistry;
}
//# sourceMappingURL=CreatorRegistry.d.ts.map