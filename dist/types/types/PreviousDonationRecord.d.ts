import BN from "bn.js";
import * as types from "../types";
export interface PreviousDonationRecordFields {
    cnft: types.CnftDataFields;
    amount: BN;
    message: string;
}
export interface PreviousDonationRecordJSON {
    cnft: types.CnftDataJSON;
    amount: string;
    message: string;
}
export declare class PreviousDonationRecord {
    readonly cnft: types.CnftData;
    readonly amount: BN;
    readonly message: string;
    constructor(fields: PreviousDonationRecordFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): PreviousDonationRecord;
    static toEncodable(fields: PreviousDonationRecordFields): {
        cnft: any;
        amount: BN;
        message: string;
    };
    toJSON(): PreviousDonationRecordJSON;
    static fromJSON(obj: PreviousDonationRecordJSON): PreviousDonationRecord;
    toEncodable(): {
        cnft: any;
        amount: BN;
        message: string;
    };
}
