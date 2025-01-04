import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface StoreLutForArgs {
    forKey: PublicKey;
    id: string;
}
export interface StoreLutForAccounts {
    lutAccount: PublicKey;
    vaultAccount: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function storeLutFor(args: StoreLutForArgs, accounts: StoreLutForAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=storeLutFor.d.ts.map