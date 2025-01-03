import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface DeleteTokenLauncherAccounts {
    tokenManager: PublicKey;
    mint: PublicKey;
    storeAccount: PublicKey;
    payer: PublicKey;
    tokenProgram: PublicKey;
    tokenMetadataProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare function deleteTokenLauncher(accounts: DeleteTokenLauncherAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=deleteTokenLauncher.d.ts.map