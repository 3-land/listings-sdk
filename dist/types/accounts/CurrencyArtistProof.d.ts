import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface CurrencyArtistProofFields {
    proofHash: BN;
    amount: BN;
    currencyVerifier: number;
    artistVerifier: number;
}
export interface CurrencyArtistProofJSON {
    proofHash: string;
    amount: string;
    currencyVerifier: number;
    artistVerifier: number;
}
export declare class CurrencyArtistProof {
    readonly proofHash: BN;
    readonly amount: BN;
    readonly currencyVerifier: number;
    readonly artistVerifier: number;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: CurrencyArtistProofFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<CurrencyArtistProof | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<CurrencyArtistProof | null>>;
    static decode(data: Buffer): CurrencyArtistProof;
    toJSON(): CurrencyArtistProofJSON;
    static fromJSON(obj: CurrencyArtistProofJSON): CurrencyArtistProof;
}
//# sourceMappingURL=CurrencyArtistProof.d.ts.map