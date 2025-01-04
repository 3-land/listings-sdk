import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface CreateTokenLauncherArgs {
    price: BN;
    decimals: number;
    tokenMetadata: types.TokenMetadataFields;
    share: number;
    tokenType: types.TokenTypeKind;
}
export interface CreateTokenLauncherAccounts {
    tokenManager: PublicKey;
    metadata: PublicKey;
    mint: PublicKey;
    tokenAccount: PublicKey;
    storeTokenAccount: PublicKey;
    genericUser: PublicKey;
    storeAccount: PublicKey;
    payer: PublicKey;
    tokenProgram: PublicKey;
    associatedTokenProgram: PublicKey;
    tokenMetadataProgram: PublicKey;
    rent: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function createTokenLauncher(args: CreateTokenLauncherArgs, accounts: CreateTokenLauncherAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=createTokenLauncher.d.ts.map