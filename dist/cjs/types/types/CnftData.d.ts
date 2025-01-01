import * as types from "../types";
export interface CnftDataFields {
    root: Array<number>;
    dataHash: Array<number>;
    creatorHash: Array<number>;
    index: number;
}
export interface CnftDataJSON {
    root: Array<number>;
    dataHash: Array<number>;
    creatorHash: Array<number>;
    index: number;
}
export declare class CnftData {
    readonly root: Array<number>;
    readonly dataHash: Array<number>;
    readonly creatorHash: Array<number>;
    readonly index: number;
    constructor(fields: CnftDataFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CnftData;
    static toEncodable(fields: CnftDataFields): {
        root: number[];
        dataHash: number[];
        creatorHash: number[];
        index: number;
    };
    toJSON(): CnftDataJSON;
    static fromJSON(obj: CnftDataJSON): CnftData;
    toEncodable(): {
        root: number[];
        dataHash: number[];
        creatorHash: number[];
        index: number;
    };
}
//# sourceMappingURL=CnftData.d.ts.map