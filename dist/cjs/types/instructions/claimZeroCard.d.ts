import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface ClaimZeroCardArgs {
    leafIndex: number;
    root: Array<number>;
    bumps: Array<number>;
    metadata: types.TightCardMetadataFields;
}
export interface ClaimZeroCardAccounts {
    storeAccount: PublicKey;
    claimer: PublicKey;
    packOpenAccountKeep: PublicKey;
    packOpenAccountClose: PublicKey;
    treeAuthority: PublicKey;
    creatorAuthority: PublicKey;
    merkleTreeVerifier: PublicKey;
    merkleTree: PublicKey;
    packAccount: PublicKey;
    merkleManager: PublicKey;
    /**
     * If there is no collecton authority record PDA then
     * this must be the Bubblegum program address.
     */
    collectionAuthorityRecordPda: PublicKey;
    editionAccount: PublicKey;
    collectionMetadata: PublicKey;
    collectionMint: PublicKey;
    bubblegumSigner: PublicKey;
    /** CHECK */
    owner: PublicKey;
    payer: PublicKey;
    logWrapper: PublicKey;
    bubblegumProgram: PublicKey;
    compressionProgram: PublicKey;
    tokenMetadataProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function claimZeroCard(args: ClaimZeroCardArgs, accounts: ClaimZeroCardAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=claimZeroCard.d.ts.map