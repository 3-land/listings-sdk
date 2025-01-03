import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RegisterCreatorArgs {
    userActivityBump: number;
}
export interface RegisterCreatorAccounts {
    creatorRegistry: PublicKey;
    userActivity: PublicKey;
    itemAccount: PublicKey;
    store: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function registerCreator(args: RegisterCreatorArgs, accounts: RegisterCreatorAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerCreator.d.ts.map