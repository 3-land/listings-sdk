import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RegisterActivityArgs {
    userActivityBump: number;
}
export interface RegisterActivityAccounts {
    userActivity: PublicKey;
    /** CHECK */
    store: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function registerActivity(args: RegisterActivityArgs, accounts: RegisterActivityAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerActivity.d.ts.map