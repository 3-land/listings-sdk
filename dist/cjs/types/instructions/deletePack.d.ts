import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface DeletePackAccounts {
    storeAccount: PublicKey;
    packAccount: PublicKey;
    packContent: PublicKey;
    packTraits: PublicKey;
    itemReserveList: PublicKey;
    archiveDeposit: PublicKey;
    creatorRegistry: PublicKey;
    manager: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare function deletePack(accounts: DeletePackAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=deletePack.d.ts.map