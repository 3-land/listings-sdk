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
    static fromDecoded(obj: any): SelectedZeroCard;
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
