import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CloseRegisterTraitsAccounts {
    packAccount: PublicKey;
    packTraitsRegistry: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare function closeRegisterTraits(accounts: CloseRegisterTraitsAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=closeRegisterTraits.d.ts.map