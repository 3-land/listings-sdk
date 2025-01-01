import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface PrintPackArgs {
    proof: types.CurrencyArtistProofFields;
    receiptSlot: BN;
}
export interface PrintPackAccounts {
    treeAuthority: PublicKey;
    creatorAuthority: PublicKey;
    discriminator: PublicKey;
    packAccount: PublicKey;
    merkleTree: PublicKey;
    merkleManager: PublicKey;
    /**
     * If there is no collecton authority record PDA then
     * this must be the Bubblegum program address.
     */
    collectionAuthorityRecordPda: PublicKey;
    packReceipt: PublicKey;
    editionAccount: PublicKey;
    collectionMetadata: PublicKey;
    collectionMint: PublicKey;
    storeAccount: PublicKey;
    paymentAccount: PublicKey;
    buytrackAccount: PublicKey;
    bubblegumSigner: PublicKey;
    owner: PublicKey;
    payer: PublicKey;
    logWrapper: PublicKey;
    bubblegumProgram: PublicKey;
    compressionProgram: PublicKey;
    tokenMetadataProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function printPack(args: PrintPackArgs, accounts: PrintPackAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=printPack.d.ts.map