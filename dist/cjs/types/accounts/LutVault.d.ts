import { PublicKey, Connection } from "@solana/web3.js";
export interface LutVaultFields {
    address: PublicKey;
    creator: PublicKey;
}
export interface LutVaultJSON {
    address: string;
    creator: string;
}
export declare class LutVault {
    readonly address: PublicKey;
    readonly creator: PublicKey;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: LutVaultFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<LutVault | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<LutVault | null>>;
    static decode(data: Buffer): LutVault;
    toJSON(): LutVaultJSON;
    static fromJSON(obj: LutVaultJSON): LutVault;
}
//# sourceMappingURL=LutVault.d.ts.map