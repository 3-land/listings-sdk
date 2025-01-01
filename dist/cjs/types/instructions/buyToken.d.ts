import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface BuyTokenArgs {
    amount: BN;
}
export interface BuyTokenAccounts {
    tokenManager: PublicKey;
    tokenAccount: PublicKey;
    tokenMintRegistry: PublicKey;
    tokenGlobalRegistry: PublicKey;
    mint: PublicKey;
    storeAccount: PublicKey;
    payer: PublicKey;
    tokenProgram: PublicKey;
    associatedTokenProgram: PublicKey;
    tokenMetadataProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function buyToken(args: BuyTokenArgs, accounts: BuyTokenAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=buyToken.d.ts.map