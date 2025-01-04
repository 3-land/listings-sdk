import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface PoolVaultFields {
    class: types.AccountClassKind;
    state: types.PoolStateKind;
    storeHash: BN;
    currency: PublicKey;
    creator: PublicKey;
    poolType: types.PoolTypeKind;
    access: types.PoolAccessKind;
    deposit: BN;
    secured: BN;
    decimals: number;
    managers: Array<PublicKey>;
    name: string;
}
export interface PoolVaultJSON {
    class: types.AccountClassJSON;
    state: types.PoolStateJSON;
    storeHash: string;
    currency: string;
    creator: string;
    poolType: types.PoolTypeJSON;
    access: types.PoolAccessJSON;
    deposit: string;
    secured: string;
    decimals: number;
    managers: Array<string>;
    name: string;
}
export declare class PoolVault {
    readonly class: types.AccountClassKind;
    readonly state: types.PoolStateKind;
    readonly storeHash: BN;
    readonly currency: PublicKey;
    readonly creator: PublicKey;
    readonly poolType: types.PoolTypeKind;
    readonly access: types.PoolAccessKind;
    readonly deposit: BN;
    readonly secured: BN;
    readonly decimals: number;
    readonly managers: Array<PublicKey>;
    readonly name: string;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: PoolVaultFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<PoolVault | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<PoolVault | null>>;
    static decode(data: Buffer): PoolVault;
    toJSON(): PoolVaultJSON;
    static fromJSON(obj: PoolVaultJSON): PoolVault;
}
//# sourceMappingURL=PoolVault.d.ts.map