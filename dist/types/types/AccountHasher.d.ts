import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface AccountHasherFields {
    seeds: Array<types.SeedFields>;
    insertAt: number;
    program: PublicKey;
    bump: number;
}
export interface AccountHasherJSON {
    seeds: Array<types.SeedJSON>;
    insertAt: number;
    program: string;
    bump: number;
}
export declare class AccountHasher {
    readonly seeds: Array<types.Seed>;
    readonly insertAt: number;
    readonly program: PublicKey;
    readonly bump: number;
    constructor(fields: AccountHasherFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AccountHasher;
    static toEncodable(fields: AccountHasherFields): {
        seeds: {
            seed: Buffer;
        }[];
        insertAt: number;
        program: PublicKey;
        bump: number;
    };
    toJSON(): AccountHasherJSON;
    static fromJSON(obj: AccountHasherJSON): AccountHasher;
    toEncodable(): {
        seeds: {
            seed: Buffer;
        }[];
        insertAt: number;
        program: PublicKey;
        bump: number;
    };
}
//# sourceMappingURL=AccountHasher.d.ts.map