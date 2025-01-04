import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface CreateCollectionArgs {
    tokenMetadata: types.TokenMetadataFields;
}
export interface CreateCollectionAccounts {
    creatorAuthority: PublicKey;
    metadata: PublicKey;
    edition: PublicKey;
    mint: PublicKey;
    tokenAccount: PublicKey;
    storeAccount: PublicKey;
    payer: PublicKey;
    tokenProgram: PublicKey;
    tokenMetadataProgram: PublicKey;
    associatedTokenProgram: PublicKey;
    rent: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function createCollection(args: CreateCollectionArgs, accounts: CreateCollectionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=createCollection.d.ts.map