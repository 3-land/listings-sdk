import * as types from "../types";
export interface OnlyTheseDOWArgsFields {
    days: number;
}
export interface OnlyTheseDOWArgsJSON {
    days: number;
}
export declare class OnlyTheseDOWArgs {
    readonly days: number;
    constructor(fields: OnlyTheseDOWArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OnlyTheseDOWArgs;
    static toEncodable(fields: OnlyTheseDOWArgsFields): {
        days: number;
    };
    toJSON(): OnlyTheseDOWArgsJSON;
    static fromJSON(obj: OnlyTheseDOWArgsJSON): OnlyTheseDOWArgs;
    toEncodable(): {
        days: number;
    };
}
//# sourceMappingURL=OnlyTheseDOWArgs.d.ts.map