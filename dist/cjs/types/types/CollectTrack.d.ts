import BN from "bn.js";
import * as types from "../types";
export interface CollectTrackFields {
    collected: BN;
    spent: BN;
}
export interface CollectTrackJSON {
    collected: string;
    spent: string;
}
export declare class CollectTrack {
    readonly collected: BN;
    readonly spent: BN;
    constructor(fields: CollectTrackFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CollectTrack;
    static toEncodable(fields: CollectTrackFields): {
        collected: BN;
        spent: BN;
    };
    toJSON(): CollectTrackJSON;
    static fromJSON(obj: CollectTrackJSON): CollectTrack;
    toEncodable(): {
        collected: BN;
        spent: BN;
    };
}
//# sourceMappingURL=CollectTrack.d.ts.map