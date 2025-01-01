import BN from "bn.js";
import * as types from "../types";
export interface SaleTrackFields {
    created: BN;
    sold: BN;
    earned: BN;
    collectors: BN;
}
export interface SaleTrackJSON {
    created: string;
    sold: string;
    earned: string;
    collectors: string;
}
export declare class SaleTrack {
    readonly created: BN;
    readonly sold: BN;
    readonly earned: BN;
    readonly collectors: BN;
    constructor(fields: SaleTrackFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SaleTrack;
    static toEncodable(fields: SaleTrackFields): {
        created: BN;
        sold: BN;
        earned: BN;
        collectors: BN;
    };
    toJSON(): SaleTrackJSON;
    static fromJSON(obj: SaleTrackJSON): SaleTrack;
    toEncodable(): {
        created: BN;
        sold: BN;
        earned: BN;
        collectors: BN;
    };
}
//# sourceMappingURL=SaleTrack.d.ts.map