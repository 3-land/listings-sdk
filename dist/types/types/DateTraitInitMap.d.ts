import BN from "bn.js";
export interface DateTraitInitMapFields {
    hash: BN;
    date: number;
    index: number;
}
export interface DateTraitInitMapJSON {
    hash: string;
    date: number;
    index: number;
}
export declare class DateTraitInitMap {
    readonly hash: BN;
    readonly date: number;
    readonly index: number;
    constructor(fields: DateTraitInitMapFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): DateTraitInitMap;
    static toEncodable(fields: DateTraitInitMapFields): {
        hash: BN;
        date: number;
        index: number;
    };
    toJSON(): DateTraitInitMapJSON;
    static fromJSON(obj: DateTraitInitMapJSON): DateTraitInitMap;
    toEncodable(): {
        hash: BN;
        date: number;
        index: number;
    };
}
