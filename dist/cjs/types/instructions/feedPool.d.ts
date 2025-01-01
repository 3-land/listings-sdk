import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface FeedPoolArgs {
    name: string;
    amount: BN;
    decimals: number;
    withdraw: number;
}
export interface FeedPoolAccounts {
    poolVault: PublicKey;
    currency: PublicKey;
    fromAta: PublicKey;
    toAta: PublicKey;
    storeAccount: PublicKey;
    payer: PublicKey;
    tokenProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function feedPool(args: FeedPoolArgs, accounts: FeedPoolAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=feedPool.d.ts.map