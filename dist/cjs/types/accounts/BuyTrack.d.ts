import { PublicKey, Connection } from "@solana/web3.js";
export interface BuyTrackFields {
    count: number;
    time: number;
}
export interface BuyTrackJSON {
    count: number;
    time: number;
}
export declare class BuyTrack {
    readonly count: number;
    readonly time: number;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: BuyTrackFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<BuyTrack | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<BuyTrack | null>>;
    static decode(data: Buffer): BuyTrack;
    toJSON(): BuyTrackJSON;
    static fromJSON(obj: BuyTrackJSON): BuyTrack;
}
//# sourceMappingURL=BuyTrack.d.ts.map