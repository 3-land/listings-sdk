import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface DeleteCardAccounts {
    packAccount: PublicKey;
    packContent: PublicKey;
    cardAccount: PublicKey;
    manager: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare function deleteCard(accounts: DeleteCardAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=deleteCard.d.ts.map