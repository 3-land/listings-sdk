import BN from "bn.js";
import * as types from "../types";
export interface FakeDepositFields {
    key: BN;
    track: types.BurnCountFields;
}
export interface FakeDepositJSON {
    key: string;
    track: types.BurnCountJSON;
}
export declare class FakeDeposit {
    readonly key: BN;
    readonly track: types.BurnCount;
    constructor(fields: FakeDepositFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.FakeDeposit;
    static toEncodable(fields: FakeDepositFields): {
        key: BN;
        track: {
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
    };
    toJSON(): FakeDepositJSON;
    static fromJSON(obj: FakeDepositJSON): FakeDeposit;
    toEncodable(): {
        key: BN;
        track: {
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
    };
}
//# sourceMappingURL=FakeDeposit.d.ts.map