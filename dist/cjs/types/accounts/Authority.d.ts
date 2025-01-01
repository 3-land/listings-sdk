import { PublicKey, Connection } from "@solana/web3.js";
export interface AuthorityFields {
}
export interface AuthorityJSON {
}
export declare class Authority {
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: AuthorityFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<Authority | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<Authority | null>>;
    static decode(data: Buffer): Authority;
    toJSON(): AuthorityJSON;
    static fromJSON(obj: AuthorityJSON): Authority;
}
//# sourceMappingURL=Authority.d.ts.map