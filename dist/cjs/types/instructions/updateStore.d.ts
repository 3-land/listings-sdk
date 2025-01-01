import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface UpdateStoreArgs {
    name: string;
    storeConfig: types.StoreConfigFields;
}
export interface UpdateStoreAccounts {
    holderAccount: PublicKey;
    storeAccount: PublicKey;
    creator: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function updateStore(args: UpdateStoreArgs, accounts: UpdateStoreAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=updateStore.d.ts.map