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
    static fromDecoded(obj: any): FakeDeposit;
    static toEncodable(fields: FakeDepositFields): {
        key: BN;
        track: any;
    };
    toJSON(): FakeDepositJSON;
    static fromJSON(obj: FakeDepositJSON): FakeDeposit;
    toEncodable(): {
        key: BN;
        track: any;
    };
}
