import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface WithdrawFromStoreAccounts {
    storeAccount: PublicKey;
    creator: PublicKey;
    systemProgram: PublicKey;
}
export declare function withdrawFromStore(accounts: WithdrawFromStoreAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=withdrawFromStore.d.ts.map