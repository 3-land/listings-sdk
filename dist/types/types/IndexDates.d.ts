import * as types from "../types";
export interface IndexDatesFields {
    created: types.IndexDateFields;
    activity: types.IndexDateFields;
}
export interface IndexDatesJSON {
    created: types.IndexDateJSON;
    activity: types.IndexDateJSON;
}
export declare class IndexDates {
    readonly created: types.IndexDate;
    readonly activity: types.IndexDate;
    constructor(fields: IndexDatesFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): IndexDates;
    static toEncodable(fields: IndexDatesFields): {
        created: any;
        activity: any;
    };
    toJSON(): IndexDatesJSON;
    static fromJSON(obj: IndexDatesJSON): IndexDates;
    toEncodable(): {
        created: any;
        activity: any;
    };
}
