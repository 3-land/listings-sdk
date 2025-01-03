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
    static fromDecoded(obj: any): types.RecoverDeposit;
    static toEncodable(fields: RecoverDepositFields): {
        cnft: {
            root: number[];
            dataHash: number[];
            creatorHash: number[];
            index: number;
        } | null;
    };
    toJSON(): RecoverDepositJSON;
    static fromJSON(obj: RecoverDepositJSON): RecoverDeposit;
    toEncodable(): {
        cnft: {
            root: number[];
            dataHash: number[];
            creatorHash: number[];
            index: number;
        } | null;
    };
}
//# sourceMappingURL=RecoverDeposit.d.ts.map