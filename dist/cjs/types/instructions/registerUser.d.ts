import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RegisterUserArgs {
    username: string;
    sub: PublicKey;
    lut: PublicKey;
}
export interface RegisterUserAccounts {
    threeId: PublicKey;
    storeAccount: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function registerUser(args: RegisterUserArgs, accounts: RegisterUserAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerUser.d.ts.map