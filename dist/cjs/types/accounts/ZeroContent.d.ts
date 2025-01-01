import { PublicKey, Connection } from "@solana/web3.js";
export interface ZeroContentFields {
    cards: Array<number>;
}
export interface ZeroContentJSON {
    cards: Array<number>;
}
export declare class ZeroContent {
    readonly cards: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: ZeroContentFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<ZeroContent | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<ZeroContent | null>>;
    static decode(data: Buffer): ZeroContent;
    toJSON(): ZeroContentJSON;
    static fromJSON(obj: ZeroContentJSON): ZeroContent;
}
//# sourceMappingURL=ZeroContent.d.ts.map