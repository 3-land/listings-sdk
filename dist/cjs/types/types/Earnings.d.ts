import * as types from "../types";
export interface EarningsFields {
}
export interface EarningsJSON {
}
export declare class Earnings {
    constructor(fields: EarningsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.Earnings;
    static toEncodable(fields: EarningsFields): {};
    toJSON(): EarningsJSON;
    static fromJSON(obj: EarningsJSON): Earnings;
    toEncodable(): {};
}
//# sourceMappingURL=Earnings.d.ts.map