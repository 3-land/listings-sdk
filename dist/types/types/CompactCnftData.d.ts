export interface CompactCnftDataFields {
    root: Array<number>;
    arweave: string;
    index: number;
}
export interface CompactCnftDataJSON {
    root: Array<number>;
    arweave: string;
    index: number;
}
export declare class CompactCnftData {
    readonly root: Array<number>;
    readonly arweave: string;
    readonly index: number;
    constructor(fields: CompactCnftDataFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): CompactCnftData;
    static toEncodable(fields: CompactCnftDataFields): {
        root: number[];
        arweave: string;
        index: number;
    };
    toJSON(): CompactCnftDataJSON;
    static fromJSON(obj: CompactCnftDataJSON): CompactCnftData;
    toEncodable(): {
        root: number[];
        arweave: string;
        index: number;
    };
}
//# sourceMappingURL=CompactCnftData.d.ts.map