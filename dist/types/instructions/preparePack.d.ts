import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface PreparePackArgs {
    supply: BN;
    identifier: BN;
}
export interface PreparePackAccounts {
    storeAccount: PublicKey;
    packAccount: PublicKey;
    packContent: PublicKey;
    creator: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function preparePack(args: PreparePackArgs, accounts: PreparePackAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=preparePack.d.ts.map