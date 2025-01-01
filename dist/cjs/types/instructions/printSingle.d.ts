import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface PrintSingleArgs {
    proof: types.CurrencyArtistProofFields | null;
    storeBump: number;
    creatorAuthBump: number;
    itemBump: number;
    treeBump: number;
    extra: types.ExtraParameterKind;
}
export interface PrintSingleAccounts {
    /** CHECK */
    owner: PublicKey;
    itemAccount: PublicKey;
    treeAuthority: PublicKey;
    storeAccount: PublicKey;
    creatorAuthority: PublicKey;
    paymentAccount: PublicKey;
    merkleTree: PublicKey;
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
    buytrackAccount: PublicKey;
    revealForMe: PublicKey;
    payer: PublicKey;
    logWrapper: PublicKey;
    bubblegumProgram: PublicKey;
    compressionProgram: PublicKey;
    tokenMetadataProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function printSingle(args: PrintSingleArgs, accounts: PrintSingleAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=printSingle.d.ts.map