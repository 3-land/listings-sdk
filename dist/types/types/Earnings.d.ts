export interface EarningsFields {
}
export interface EarningsJSON {
}
export declare class Earnings {
    constructor(fields: EarningsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): Earnings;
    static toEncodable(fields: EarningsFields): {};
    toJSON(): EarningsJSON;
    static fromJSON(obj: EarningsJSON): Earnings;
    toEncodable(): {};
}
