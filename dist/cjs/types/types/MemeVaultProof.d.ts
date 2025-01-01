import BN from "bn.js";
import * as types from "../types";
export interface MemeVaultProofFields {
    amount: BN;
    halfCurrencyHash: number;
}
export interface MemeVaultProofJSON {
    amount: string;
    halfCurrencyHash: number;
}
export declare class MemeVaultProof {
    readonly amount: BN;
    readonly halfCurrencyHash: number;
    constructor(fields: MemeVaultProofFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.MemeVaultProof;
    static toEncodable(fields: MemeVaultProofFields): {
        amount: BN;
        halfCurrencyHash: number;
    };
    toJSON(): MemeVaultProofJSON;
    static fromJSON(obj: MemeVaultProofJSON): MemeVaultProof;
    toEncodable(): {
        amount: BN;
        halfCurrencyHash: number;
    };
}
//# sourceMappingURL=MemeVaultProof.d.ts.map