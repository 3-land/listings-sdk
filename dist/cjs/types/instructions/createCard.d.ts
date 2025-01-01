import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface CreateCardArgs {
    supply: number;
    index: number;
    metadata: types.MetadataArgsFields;
}
export interface CreateCardAccounts {
    packAccount: PublicKey;
    cardAccount: PublicKey;
    creatorAuthority: PublicKey;
    packContent: PublicKey;
    creator: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function createCard(args: CreateCardArgs, accounts: CreateCardAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=createCard.d.ts.map