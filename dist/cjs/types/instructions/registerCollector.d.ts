import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RegisterCollectorArgs {
    creatorBump: number;
    activityBump: number;
}
export interface RegisterCollectorAccounts {
    collectorArtistRegistry: PublicKey;
    collectorGlobalRegistry: PublicKey;
    creatorRegistry: PublicKey;
    userActivity: PublicKey;
    store: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function registerCollector(args: RegisterCollectorArgs, accounts: RegisterCollectorAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerCollector.d.ts.map