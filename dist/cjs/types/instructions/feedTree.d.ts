import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface FeedTreeArgs {
    managerBump: number;
    maxDepth: number;
    maxBufferSize: number;
    public: boolean | null;
}
export interface FeedTreeAccounts {
    merkleAccount: PublicKey;
    merkleManager: PublicKey;
    lutAccount: PublicKey;
    treeAuthority: PublicKey;
    logWrapper: PublicKey;
    bubblegumProgram: PublicKey;
    compressionProgram: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function feedTree(args: FeedTreeArgs, accounts: FeedTreeAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=feedTree.d.ts.map