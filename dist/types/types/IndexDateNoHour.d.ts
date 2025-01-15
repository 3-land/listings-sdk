import * as types from "../types";
export interface IndexDateNoHourFields {
    day: number;
    week: number;
    month: number;
    minRelative: number;
}
export interface IndexDateNoHourJSON {
    day: number;
    week: number;
    month: number;
    minRelative: number;
}
export declare class IndexDateNoHour {
    readonly day: number;
    readonly week: number;
    readonly month: number;
    readonly minRelative: number;
    constructor(fields: IndexDateNoHourFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.IndexDateNoHour;
    static toEncodable(fields: IndexDateNoHourFields): {
        day: number;
        week: number;
        month: number;
        minRelative: number;
    };
    toJSON(): IndexDateNoHourJSON;
    static fromJSON(obj: IndexDateNoHourJSON): IndexDateNoHour;
    toEncodable(): {
        day: number;
        week: number;
        month: number;
        minRelative: number;
    };
}
//# sourceMappingURL=IndexDateNoHour.d.ts.map