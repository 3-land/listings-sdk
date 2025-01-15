import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface ShareSecretArgs {
    payload: Array<number>;
}
export interface ShareSecretAccounts {
    revealForMe: PublicKey;
    /** CHECK */
    itemAccount: PublicKey;
    storeAccount: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function shareSecret(args: ShareSecretArgs, accounts: ShareSecretAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=shareSecret.d.ts.map