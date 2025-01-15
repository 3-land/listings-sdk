import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RegisterSecureArgs {
    arweave: string;
}
export interface RegisterSecureAccounts {
    /** CHECK */
    secureHolder: PublicKey;
    /** CHECK */
    itemAccount: PublicKey;
    storeAccount: PublicKey;
    owner: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function registerSecure(args: RegisterSecureArgs, accounts: RegisterSecureAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerSecure.d.ts.map