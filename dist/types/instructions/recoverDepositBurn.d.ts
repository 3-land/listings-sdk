import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface RecoverDepositBurnArgs {
    deposit: types.RecoverDepositFields;
    burn: number;
}
export interface RecoverDepositBurnAccounts {
    burnDeposit: PublicKey;
    artistBurnTrack: PublicKey;
    globalBurnTrack: PublicKey;
    itemAccount: PublicKey;
    packAccount: PublicKey;
    treeAuthority: PublicKey;
    /** CHECK */
    merkleTree: PublicKey;
    /** CHECK */
    fromAta: PublicKey;
    /** CHECK */
    toAta: PublicKey;
    /** CHECK */
    recoverTo: PublicKey;
    storeAccount: PublicKey;
    /** CHECK */
    token: PublicKey;
    payer: PublicKey;
    tokenProgram: PublicKey;
    bubblegumProgram: PublicKey;
    logWrapper: PublicKey;
    compressionProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function recoverDepositBurn(args: RecoverDepositBurnArgs, accounts: RecoverDepositBurnAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=recoverDepositBurn.d.ts.map