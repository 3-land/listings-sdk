import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RegisterPackUploadsArgs {
    arweave: string | null;
}
export interface RegisterPackUploadsAccounts {
    packAccount: PublicKey;
    packUploads: PublicKey;
    newPackUploads: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function registerPackUploads(args: RegisterPackUploadsArgs, accounts: RegisterPackUploadsAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerPackUploads.d.ts.map