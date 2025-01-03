import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface FeedTraitsArgs {
    traits: types.FeedingTraitsFields;
}
export interface FeedTraitsAccounts {
    packAccount: PublicKey;
    packTraits: PublicKey;
    packTraitsRegistry: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function feedTraits(args: FeedTraitsArgs, accounts: FeedTraitsAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=feedTraits.d.ts.map