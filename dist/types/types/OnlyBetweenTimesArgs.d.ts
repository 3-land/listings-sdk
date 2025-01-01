import * as types from "../types";
export interface OnlyBetweenTimesArgsFields {
    start: number;
    end: number;
    rangeType: types.TimeRangeTypeKind;
}
export interface OnlyBetweenTimesArgsJSON {
    start: number;
    end: number;
    rangeType: types.TimeRangeTypeJSON;
}
export declare class OnlyBetweenTimesArgs {
    readonly start: number;
    readonly end: number;
    readonly rangeType: types.TimeRangeTypeKind;
    constructor(fields: OnlyBetweenTimesArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): OnlyBetweenTimesArgs;
    static toEncodable(fields: OnlyBetweenTimesArgsFields): {
        start: number;
        end: number;
        rangeType: any;
    };
    toJSON(): OnlyBetweenTimesArgsJSON;
    static fromJSON(obj: OnlyBetweenTimesArgsJSON): OnlyBetweenTimesArgs;
    toEncodable(): {
        start: number;
        end: number;
        rangeType: any;
    };
}
