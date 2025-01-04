import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ItemArchiveFields {
    class: types.AccountClassKind;
    globalState: types.GlobalStateKind;
    holder: PublicKey;
    creator: PublicKey;
    dates: types.IndexDatesFields;
    category: types.CategoryFields;
    superCategory: types.SuperCategoryFields;
    eventCategory: number;
    trackType: types.TrackRegistryKind;
    mainCurrencyHash: BN;
    state: types.ItemStateKind;
    collection: PublicKey;
    cnft: PublicKey;
    identifier: BN;
    hash: BN;
    supply: BN;
    volume: Array<types.FakeVolumeTrackFields>;
}
export interface ItemArchiveJSON {
    class: types.AccountClassJSON;
    globalState: types.GlobalStateJSON;
    holder: string;
    creator: string;
    dates: types.IndexDatesJSON;
    category: types.CategoryJSON;
    superCategory: types.SuperCategoryJSON;
    eventCategory: number;
    trackType: types.TrackRegistryJSON;
    mainCurrencyHash: string;
    state: types.ItemStateJSON;
    collection: string;
    cnft: string;
    identifier: string;
    hash: string;
    supply: string;
    volume: Array<types.FakeVolumeTrackJSON>;
}
export declare class ItemArchive {
    readonly class: types.AccountClassKind;
    readonly globalState: types.GlobalStateKind;
    readonly holder: PublicKey;
    readonly creator: PublicKey;
    readonly dates: types.IndexDates;
    readonly category: types.Category;
    readonly superCategory: types.SuperCategory;
    readonly eventCategory: number;
    readonly trackType: types.TrackRegistryKind;
    readonly mainCurrencyHash: BN;
    readonly state: types.ItemStateKind;
    readonly collection: PublicKey;
    readonly cnft: PublicKey;
    readonly identifier: BN;
    readonly hash: BN;
    readonly supply: BN;
    readonly volume: Array<types.FakeVolumeTrack>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: ItemArchiveFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<ItemArchive | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<ItemArchive | null>>;
    static decode(data: Buffer): ItemArchive;
    toJSON(): ItemArchiveJSON;
    static fromJSON(obj: ItemArchiveJSON): ItemArchive;
}
//# sourceMappingURL=ItemArchive.d.ts.map