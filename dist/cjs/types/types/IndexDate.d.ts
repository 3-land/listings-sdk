import * as types from "../types";
export interface IndexDateFields {
    hour: number;
    day: number;
    week: number;
    month: number;
    minRelative: number;
}
export interface IndexDateJSON {
    hour: number;
    day: number;
    week: number;
    month: number;
    minRelative: number;
}
export declare class IndexDate {
    readonly hour: number;
    readonly day: number;
    readonly week: number;
    readonly month: number;
    readonly minRelative: number;
    constructor(fields: IndexDateFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.IndexDate;
    static toEncodable(fields: IndexDateFields): {
        hour: number;
        day: number;
        week: number;
        month: number;
        minRelative: number;
    };
    toJSON(): IndexDateJSON;
    static fromJSON(obj: IndexDateJSON): IndexDate;
    toEncodable(): {
        hour: number;
        day: number;
        week: number;
        month: number;
        minRelative: number;
    };
}
//# sourceMappingURL=IndexDate.d.ts.map