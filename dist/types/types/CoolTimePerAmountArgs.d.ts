import * as types from "../types";
export interface CoolTimePerAmountArgsFields {
    count: number;
    amount: number;
    time: number;
}
export interface CoolTimePerAmountArgsJSON {
    count: number;
    amount: number;
    time: number;
}
export declare class CoolTimePerAmountArgs {
    readonly count: number;
    readonly amount: number;
    readonly time: number;
    constructor(fields: CoolTimePerAmountArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CoolTimePerAmountArgs;
    static toEncodable(fields: CoolTimePerAmountArgsFields): {
        count: number;
        amount: number;
        time: number;
    };
    toJSON(): CoolTimePerAmountArgsJSON;
    static fromJSON(obj: CoolTimePerAmountArgsJSON): CoolTimePerAmountArgs;
    toEncodable(): {
        count: number;
        amount: number;
        time: number;
    };
}
//# sourceMappingURL=CoolTimePerAmountArgs.d.ts.map