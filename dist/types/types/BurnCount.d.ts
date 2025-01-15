import BN from "bn.js";
import * as types from "../types";
export interface BurnCountFields {
    list: Array<types.FakeBurnCountFields>;
}
export interface BurnCountJSON {
    list: Array<types.FakeBurnCountJSON>;
}
export declare class BurnCount {
    readonly list: Array<types.FakeBurnCount>;
    constructor(fields: BurnCountFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.BurnCount;
    static toEncodable(fields: BurnCountFields): {
        list: {
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
        }[];
    };
    toJSON(): BurnCountJSON;
    static fromJSON(obj: BurnCountJSON): BurnCount;
    toEncodable(): {
        list: {
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
        }[];
    };
}
//# sourceMappingURL=BurnCount.d.ts.map