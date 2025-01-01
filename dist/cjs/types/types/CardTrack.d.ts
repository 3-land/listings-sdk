import * as types from "../types";
export interface CardTrackFields {
    supply: number;
    created: number;
    state: types.CardStateKind;
}
export interface CardTrackJSON {
    supply: number;
    created: number;
    state: types.CardStateJSON;
}
export declare class CardTrack {
    readonly supply: number;
    readonly created: number;
    readonly state: types.CardStateKind;
    constructor(fields: CardTrackFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CardTrack;
    static toEncodable(fields: CardTrackFields): {
        supply: number;
        created: number;
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
        };
    };
    toJSON(): CardTrackJSON;
    static fromJSON(obj: CardTrackJSON): CardTrack;
    toEncodable(): {
        supply: number;
        created: number;
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
        };
    };
}
//# sourceMappingURL=CardTrack.d.ts.map