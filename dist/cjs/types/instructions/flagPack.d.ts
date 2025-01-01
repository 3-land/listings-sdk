import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface FlagPackArgs {
    globalState: types.GlobalStateKind | null;
    state: types.ItemStateKind | null;
    serverless: number | null;
}
export interface FlagPackAccounts {
    storeAccount: PublicKey;
    packAccount: PublicKey;
    creator: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function flagPack(args: FlagPackArgs, accounts: FlagPackAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=flagPack.d.ts.map