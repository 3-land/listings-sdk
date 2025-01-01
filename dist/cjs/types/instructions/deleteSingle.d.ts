import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface DeleteSingleAccounts {
    storeAccount: PublicKey;
    itemAccount: PublicKey;
    itemReserveList: PublicKey;
    archiveDeposit: PublicKey;
    creatorRegistry: PublicKey;
    manager: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare function deleteSingle(accounts: DeleteSingleAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=deleteSingle.d.ts.map