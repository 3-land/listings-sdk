import { PublicKey, Connection } from "@solana/web3.js";
export interface ZeroCardFields {
}
export interface ZeroCardJSON {
}
export declare class ZeroCard {
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: ZeroCardFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<ZeroCard | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<ZeroCard | null>>;
    static decode(data: Buffer): ZeroCard;
    toJSON(): ZeroCardJSON;
    static fromJSON(obj: ZeroCardJSON): ZeroCard;
}
//# sourceMappingURL=ZeroCard.d.ts.map