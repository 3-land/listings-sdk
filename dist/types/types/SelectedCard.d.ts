export interface SelectedCardFields {
    id: number;
    edition: number;
}
export interface SelectedCardJSON {
    id: number;
    edition: number;
}
export declare class SelectedCard {
    readonly id: number;
    readonly edition: number;
    constructor(fields: SelectedCardFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): SelectedCard;
    static toEncodable(fields: SelectedCardFields): {
        id: number;
        edition: number;
    };
    toJSON(): SelectedCardJSON;
    static fromJSON(obj: SelectedCardJSON): SelectedCard;
    toEncodable(): {
        id: number;
        edition: number;
    };
}
