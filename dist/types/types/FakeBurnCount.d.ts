import BN from "bn.js";
import * as types from "../types";
export interface FakeBurnCountFields {
    key: BN;
    track: types.DepositTrackFields;
}
export interface FakeBurnCountJSON {
    key: string;
    track: types.DepositTrackJSON;
}
export declare class FakeBurnCount {
    readonly key: BN;
    readonly track: types.DepositTrack;
    constructor(fields: FakeBurnCountFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.FakeBurnCount;
    static toEncodable(fields: FakeBurnCountFields): {
        key: BN;
        track: {
            depositTrackType: {
                Creator: {};
            } | {
                PdaCreator: {};
            };
            depositState: {
                Available: {};
            } | {
                Burning: {};
            };
        };
    };
    toJSON(): FakeBurnCountJSON;
    static fromJSON(obj: FakeBurnCountJSON): FakeBurnCount;
    toEncodable(): {
        key: BN;
        track: {
            depositTrackType: {
                Creator: {};
            } | {
                PdaCreator: {};
            };
            depositState: {
                Available: {};
            } | {
                Burning: {};
            };
        };
    };
}
//# sourceMappingURL=FakeBurnCount.d.ts.map