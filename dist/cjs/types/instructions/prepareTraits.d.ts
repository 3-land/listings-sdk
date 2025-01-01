import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface PrepareTraitsAccounts {
    packAccount: PublicKey;
    packTraits: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare function prepareTraits(accounts: PrepareTraitsAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=prepareTraits.d.ts.map