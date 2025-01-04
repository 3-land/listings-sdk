import * as types from "../types";
export interface TotalPerTimeWalletArgsFields {
    amount: number;
    time: number;
}
export interface TotalPerTimeWalletArgsJSON {
    amount: number;
    time: number;
}
export declare class TotalPerTimeWalletArgs {
    readonly amount: number;
    readonly time: number;
    constructor(fields: TotalPerTimeWalletArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.TotalPerTimeWalletArgs;
    static toEncodable(fields: TotalPerTimeWalletArgsFields): {
        amount: number;
        time: number;
    };
    toJSON(): TotalPerTimeWalletArgsJSON;
    static fromJSON(obj: TotalPerTimeWalletArgsJSON): TotalPerTimeWalletArgs;
    toEncodable(): {
        amount: number;
        time: number;
    };
}
//# sourceMappingURL=TotalPerTimeWalletArgs.d.ts.map