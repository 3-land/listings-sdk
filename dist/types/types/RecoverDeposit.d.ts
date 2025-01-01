import * as types from "../types";
export interface RecoverDepositFields {
    cnft: types.CnftDataFields | null;
}
export interface RecoverDepositJSON {
    cnft: types.CnftDataJSON | null;
}
export declare class RecoverDeposit {
    readonly cnft: types.CnftData | null;
    constructor(fields: RecoverDepositFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): RecoverDeposit;
    static toEncodable(fields: RecoverDepositFields): {
        cnft: any;
    };
    toJSON(): RecoverDepositJSON;
    static fromJSON(obj: RecoverDepositJSON): RecoverDeposit;
    toEncodable(): {
        cnft: any;
    };
}
