import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CreatePoolArgs {
    name: string;
}
export interface CreatePoolAccounts {
    poolVault: PublicKey;
    currency: PublicKey;
    storeAccount: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function createPool(args: CreatePoolArgs, accounts: CreatePoolAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=createPool.d.ts.map