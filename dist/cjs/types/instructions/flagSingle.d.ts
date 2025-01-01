import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface FlagSingleArgs {
    globalState: types.GlobalStateKind;
    state: types.ItemStateKind;
}
export interface FlagSingleAccounts {
    storeAccount: PublicKey;
    itemAccount: PublicKey;
    creator: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function flagSingle(args: FlagSingleArgs, accounts: FlagSingleAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=flagSingle.d.ts.map