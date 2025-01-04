import * as types from "../types";
export interface TotalPerTimeArgsFields {
    count: number;
    amount: number;
    time: number;
    lastTimeReset: number;
}
export interface TotalPerTimeArgsJSON {
    count: number;
    amount: number;
    time: number;
    lastTimeReset: number;
}
export declare class TotalPerTimeArgs {
    readonly count: number;
    readonly amount: number;
    readonly time: number;
    readonly lastTimeReset: number;
    constructor(fields: TotalPerTimeArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.TotalPerTimeArgs;
    static toEncodable(fields: TotalPerTimeArgsFields): {
        count: number;
        amount: number;
        time: number;
        lastTimeReset: number;
    };
    toJSON(): TotalPerTimeArgsJSON;
    static fromJSON(obj: TotalPerTimeArgsJSON): TotalPerTimeArgs;
    toEncodable(): {
        count: number;
        amount: number;
        time: number;
        lastTimeReset: number;
    };
}
//# sourceMappingURL=TotalPerTimeArgs.d.ts.map