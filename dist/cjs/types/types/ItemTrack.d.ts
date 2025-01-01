import BN from "bn.js";
import * as types from "../types";
export interface ItemTrackFields {
    state: types.ItemStateKind;
    supply: BN;
    created: BN;
}
export interface ItemTrackJSON {
    state: types.ItemStateJSON;
    supply: string;
    created: string;
}
export declare class ItemTrack {
    readonly state: types.ItemStateKind;
    readonly supply: BN;
    readonly created: BN;
    constructor(fields: ItemTrackFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ItemTrack;
    static toEncodable(fields: ItemTrackFields): {
        state: {
            Active: {};
        } | {
            Hidden: {};
        } | {
            Inactive: {};
        } | {
            Retired: {};
        } | {
            SoldOut: {};
        } | {
            None: {};
        } | {
            NotReady: {};
        } | {
            NotReadyStarted: {};
        } | {
            Flagged: {};
        };
        supply: BN;
        created: BN;
    };
    toJSON(): ItemTrackJSON;
    static fromJSON(obj: ItemTrackJSON): ItemTrack;
    toEncodable(): {
        state: {
            Active: {};
        } | {
            Hidden: {};
        } | {
            Inactive: {};
        } | {
            Retired: {};
        } | {
            SoldOut: {};
        } | {
            None: {};
        } | {
            NotReady: {};
        } | {
            NotReadyStarted: {};
        } | {
            Flagged: {};
        };
        supply: BN;
        created: BN;
    };
}
//# sourceMappingURL=ItemTrack.d.ts.map