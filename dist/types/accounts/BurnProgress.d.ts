import { PublicKey, Connection } from "@solana/web3.js";
export interface BurnProgressFields {
    id: number;
    burns: PublicKey;
}
export interface BurnProgressJSON {
    id: number;
    burns: string;
}
export declare class BurnProgress {
    readonly id: number;
    readonly burns: PublicKey;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: BurnProgressFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<BurnProgress | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<BurnProgress | null>>;
    static decode(data: Buffer): BurnProgress;
    toJSON(): BurnProgressJSON;
    static fromJSON(obj: BurnProgressJSON): BurnProgress;
}
//# sourceMappingURL=BurnProgress.d.ts.map