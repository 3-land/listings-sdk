import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface UnwrapAndDestroyArgs {
    metadata: types.UnwrapMetadataFields;
}
export interface UnwrapAndDestroyAccounts {
    itemAccount: PublicKey;
    packAccount: PublicKey;
    /** CHECK */
    currency: PublicKey;
    /** CHECK */
    splVaultFrom: PublicKey;
    /** CHECK */
    splVaultTo: PublicKey;
    /** CHECK */
    merkleTree: PublicKey;
    owner: PublicKey;
    tokenProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function unwrapAndDestroy(args: UnwrapAndDestroyArgs, accounts: UnwrapAndDestroyAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=unwrapAndDestroy.d.ts.map