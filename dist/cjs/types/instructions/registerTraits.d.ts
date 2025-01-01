import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RegisterTraitsArgs {
    traits: Array<string>;
}
export interface RegisterTraitsAccounts {
    packAccount: PublicKey;
    packTraitsRegistry: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function registerTraits(args: RegisterTraitsArgs, accounts: RegisterTraitsAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerTraits.d.ts.map