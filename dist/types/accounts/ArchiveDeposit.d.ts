import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ArchiveDepositFields {
    class: types.AccountClassKind;
    identifier: BN;
    creator: PublicKey;
    dates: types.IndexDatesFields;
    holder: PublicKey;
    category: types.CategoryFields;
    superCategory: types.SuperCategoryFields;
    eventCategory: number;
    hash: BN;
    manager: PublicKey;
    metadata: types.MetadataArgsFields;
    supply: BN;
    trackType: types.TrackRegistryKind;
    mainCurrencyHash: BN;
    volume: Array<types.FakeVolumeTrackFields>;
}
export interface ArchiveDepositJSON {
    class: types.AccountClassJSON;
    identifier: string;
    creator: string;
    dates: types.IndexDatesJSON;
    holder: string;
    category: types.CategoryJSON;
    superCategory: types.SuperCategoryJSON;
    eventCategory: number;
    hash: string;
    manager: string;
    metadata: types.MetadataArgsJSON;
    supply: string;
    trackType: types.TrackRegistryJSON;
    mainCurrencyHash: string;
    volume: Array<types.FakeVolumeTrackJSON>;
}
export declare class ArchiveDeposit {
    readonly class: types.AccountClassKind;
    readonly identifier: BN;
    readonly creator: PublicKey;
    readonly dates: types.IndexDates;
    readonly holder: PublicKey;
    readonly category: types.Category;
    readonly superCategory: types.SuperCategory;
    readonly eventCategory: number;
    readonly hash: BN;
    readonly manager: PublicKey;
    readonly metadata: types.MetadataArgs;
    readonly supply: BN;
    readonly trackType: types.TrackRegistryKind;
    readonly mainCurrencyHash: BN;
    readonly volume: Array<types.FakeVolumeTrack>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: ArchiveDepositFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<ArchiveDeposit | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<ArchiveDeposit | null>>;
    static decode(data: Buffer): ArchiveDeposit;
    toJSON(): ArchiveDepositJSON;
    static fromJSON(obj: ArchiveDepositJSON): ArchiveDeposit;
}
//# sourceMappingURL=ArchiveDeposit.d.ts.map