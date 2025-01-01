import * as types from "../types";
export interface BurnTrackFields {
    amount: number;
    burnType: types.BurnTypeBurnKind;
}
export interface BurnTrackJSON {
    amount: number;
    burnType: types.BurnTypeBurnJSON;
}
export declare class BurnTrack {
    readonly amount: number;
    readonly burnType: types.BurnTypeBurnKind;
    constructor(fields: BurnTrackFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.BurnTrack;
    static toEncodable(fields: BurnTrackFields): {
        amount: number;
        burnType: {
            CollectionBurn: {};
        };
    };
    toJSON(): BurnTrackJSON;
    static fromJSON(obj: BurnTrackJSON): BurnTrack;
    toEncodable(): {
        amount: number;
        burnType: {
            CollectionBurn: {};
        };
    };
}
//# sourceMappingURL=BurnTrack.d.ts.map