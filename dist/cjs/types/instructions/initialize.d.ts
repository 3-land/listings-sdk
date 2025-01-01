import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface InitializeArgs {
    slot: BN;
    globalFee: types.GlobalFeeFields | null;
}
export interface InitializeAccounts {
    holderAccount: PublicKey;
    creator: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function initialize(args: InitializeArgs, accounts: InitializeAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initialize.d.ts.map