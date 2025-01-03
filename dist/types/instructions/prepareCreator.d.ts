import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface PrepareCreatorAccounts {
    storeAccount: PublicKey;
    creatorAuthority: PublicKey;
    creator: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare function prepareCreator(accounts: PrepareCreatorAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=prepareCreator.d.ts.map