export interface TokenMetadataFields {
    name: string;
    symbol: string;
    arweave: string;
}
export interface TokenMetadataJSON {
    name: string;
    symbol: string;
    arweave: string;
}
export declare class TokenMetadata {
    readonly name: string;
    readonly symbol: string;
    readonly arweave: string;
    constructor(fields: TokenMetadataFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): TokenMetadata;
    static toEncodable(fields: TokenMetadataFields): {
        name: string;
        symbol: string;
        arweave: string;
    };
    toJSON(): TokenMetadataJSON;
    static fromJSON(obj: TokenMetadataJSON): TokenMetadata;
    toEncodable(): {
        name: string;
        symbol: string;
        arweave: string;
    };
}
//# sourceMappingURL=TokenMetadata.d.ts.map