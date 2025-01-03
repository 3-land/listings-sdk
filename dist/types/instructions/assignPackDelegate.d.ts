import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface AssignPackDelegateAccounts {
    storeAccount: PublicKey;
    packAccount: PublicKey;
    delegateAccount: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare function assignPackDelegate(accounts: AssignPackDelegateAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=assignPackDelegate.d.ts.map