import { PublicKey } from "@solana/web3.js";
export interface CreatorFields {
    address: PublicKey;
    verified: boolean;
    share: number;
}
export interface CreatorJSON {
    address: string;
    verified: boolean;
    share: number;
}
export declare class Creator {
    readonly address: PublicKey;
    readonly verified: boolean;
    readonly share: number;
    constructor(fields: CreatorFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): Creator;
    static toEncodable(fields: CreatorFields): {
        address: PublicKey;
        verified: boolean;
        share: number;
    };
    toJSON(): CreatorJSON;
    static fromJSON(obj: CreatorJSON): Creator;
    toEncodable(): {
        address: PublicKey;
        verified: boolean;
        share: number;
    };
}
