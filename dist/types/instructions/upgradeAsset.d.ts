import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface UpgradeAssetArgs {
    changing: types.ChangingMetadataFields;
    index: number;
    root: Array<number>;
}
export interface UpgradeAssetAccounts {
    itemAccount: PublicKey;
    packAccount: PublicKey;
    merkleManager: PublicKey;
    storeAccount: PublicKey;
    creatorAuthority: PublicKey;
    /** CHECK */
    merkleTree: PublicKey;
    /** CHECK */
    owner: PublicKey;
    creator: PublicKey;
    treeAuthority: PublicKey;
    /**
     * If there is no collecton authority record PDA then
     * this must be the Bubblegum program address.
     */
    collectionAuthorityRecordPda: PublicKey;
    collectionMetadata: PublicKey;
    collectionMint: PublicKey;
    logWrapper: PublicKey;
    bubblegumProgram: PublicKey;
    compressionProgram: PublicKey;
    tokenMetadataProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function upgradeAsset(args: UpgradeAssetArgs, accounts: UpgradeAssetAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=upgradeAsset.d.ts.map