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
    static fromDecoded(obj: any): CardTrack;
    static toEncodable(fields: CardTrackFields): {
        supply: number;
        created: number;
        state: any;
    };
    toJSON(): CardTrackJSON;
    static fromJSON(obj: CardTrackJSON): CardTrack;
    toEncodable(): {
        supply: number;
        created: number;
        state: any;
    };
}
