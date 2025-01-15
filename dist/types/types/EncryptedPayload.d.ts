export interface EncryptedPayloadFields {
    encType: number;
    arweave: string;
}
export interface EncryptedPayloadJSON {
    encType: number;
    arweave: string;
}
export declare class EncryptedPayload {
    readonly encType: number;
    readonly arweave: string;
    constructor(fields: EncryptedPayloadFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): EncryptedPayload;
    static toEncodable(fields: EncryptedPayloadFields): {
        encType: number;
        arweave: string;
    };
    toJSON(): EncryptedPayloadJSON;
    static fromJSON(obj: EncryptedPayloadJSON): EncryptedPayload;
    toEncodable(): {
        encType: number;
        arweave: string;
    };
}
//# sourceMappingURL=EncryptedPayload.d.ts.map