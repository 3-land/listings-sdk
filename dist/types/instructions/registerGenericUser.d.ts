import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RegisterGenericUserArgs {
    username: string;
    subApp: BN;
    subWallet: PublicKey;
    category: BN;
    lut: PublicKey | null;
    genericData: Array<types.GenericStoreFields> | null;
    arweave: string | null;
    cnft: types.CompactCnftDataFields | null;
}
export interface RegisterGenericUserAccounts {
    genericUser: PublicKey;
    storeAccount: PublicKey;
    profileHolder: PublicKey;
    categoryHolder: PublicKey;
    oldCategoryHolder: PublicKey;
    payer: PublicKey;
    merkleTree: PublicKey;
    treeAuthority: PublicKey;
    merkleManager: PublicKey;
    logWrapper: PublicKey;
    bubblegumProgram: PublicKey;
    compressionProgram: PublicKey;
    tokenMetadataProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function registerGenericUser(args: RegisterGenericUserArgs, accounts: RegisterGenericUserAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerGenericUser.d.ts.map