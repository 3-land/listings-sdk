import * as types from "../types";
export interface SelectedZeroCardFields {
    id: number;
    edition: number;
}
export interface SelectedZeroCardJSON {
    id: number;
    edition: number;
}
export declare class SelectedZeroCard {
    readonly id: number;
    readonly edition: number;
    constructor(fields: SelectedZeroCardFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SelectedZeroCard;
    static toEncodable(fields: SelectedZeroCardFields): {
        id: number;
        edition: number;
    };
    toJSON(): SelectedZeroCardJSON;
    static fromJSON(obj: SelectedZeroCardJSON): SelectedZeroCard;
    toEncodable(): {
        id: number;
        edition: number;
    };
}
//# sourceMappingURL=SelectedZeroCard.d.ts.map