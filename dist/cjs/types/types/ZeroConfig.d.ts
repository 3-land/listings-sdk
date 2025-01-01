import * as types from "../types";
export interface ZeroConfigFields {
    bytes: number;
    chunks: Array<number>;
    chunkSize: number;
    supplyChunkBytes: number;
}
export interface ZeroConfigJSON {
    bytes: number;
    chunks: Array<number>;
    chunkSize: number;
    supplyChunkBytes: number;
}
export declare class ZeroConfig {
    readonly bytes: number;
    readonly chunks: Array<number>;
    readonly chunkSize: number;
    readonly supplyChunkBytes: number;
    constructor(fields: ZeroConfigFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ZeroConfig;
    static toEncodable(fields: ZeroConfigFields): {
        bytes: number;
        chunks: number[];
        chunkSize: number;
        supplyChunkBytes: number;
    };
    toJSON(): ZeroConfigJSON;
    static fromJSON(obj: ZeroConfigJSON): ZeroConfig;
    toEncodable(): {
        bytes: number;
        chunks: number[];
        chunkSize: number;
        supplyChunkBytes: number;
    };
}
//# sourceMappingURL=ZeroConfig.d.ts.map