import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface CreateStoreArgs {
    name: string;
    storeConfig: types.StoreConfigFields;
    storeId: number;
}
export interface CreateStoreAccounts {
    holderAccount: PublicKey;
    storeAccount: PublicKey;
    creator: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function createStore(args: CreateStoreArgs, accounts: CreateStoreAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=createStore.d.ts.map