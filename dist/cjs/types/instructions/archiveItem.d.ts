import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface ArchiveItemArgs {
    storeBump: number;
}
export interface ArchiveItemAccounts {
    storeAccount: PublicKey;
    itemAccount: PublicKey;
    archiveDeposit: PublicKey;
    treeAuthority: PublicKey;
    creatorAuthority: PublicKey;
    merkleTree: PublicKey;
    merkleManager: PublicKey;
    owner: PublicKey;
    payer: PublicKey;
    logWrapper: PublicKey;
    bubblegumProgram: PublicKey;
    compressionProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function archiveItem(args: ArchiveItemArgs, accounts: ArchiveItemAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=archiveItem.d.ts.map