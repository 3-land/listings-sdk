import BN from "bn.js";
import * as types from "../types";
export interface DepositFields {
    depositType: types.DepositTypeKind;
    format: types.DepositFormatKind;
    interestHash: BN;
    proofSize: number;
}
export interface DepositJSON {
    depositType: types.DepositTypeJSON;
    format: types.DepositFormatJSON;
    interestHash: string;
    proofSize: number;
}
export declare class Deposit {
    readonly depositType: types.DepositTypeKind;
    readonly format: types.DepositFormatKind;
    readonly interestHash: BN;
    readonly proofSize: number;
    constructor(fields: DepositFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): Deposit;
    static toEncodable(fields: DepositFields): {
        depositType: any;
        format: any;
        interestHash: BN;
        proofSize: number;
    };
    toJSON(): DepositJSON;
    static fromJSON(obj: DepositJSON): Deposit;
    toEncodable(): {
        depositType: any;
        format: any;
        interestHash: BN;
        proofSize: number;
    };
}
