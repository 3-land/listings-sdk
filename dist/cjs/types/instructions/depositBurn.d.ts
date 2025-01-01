import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface DepositBurnArgs {
    deposit: types.DepositFields;
}
export interface DepositBurnAccounts {
    newBurnDeposit: PublicKey;
    existingBurnDeposit: PublicKey;
    /** CHECK */
    artistBurnTrack: PublicKey;
    /** CHECK */
    globalBurnTrack: PublicKey;
    itemAccount: PublicKey;
    packAccount: PublicKey;
    /** CHECK */
    metadataAccount: PublicKey;
    owner: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function depositBurn(args: DepositBurnArgs, accounts: DepositBurnAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=depositBurn.d.ts.map