import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface UpgradeItemArgs {
    metadata: types.UpdateMetadataFields;
}
export interface UpgradeItemAccounts {
    itemAccount: PublicKey;
    packAccount: PublicKey;
    storeAccount: PublicKey;
    creator: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function upgradeItem(args: UpgradeItemArgs, accounts: UpgradeItemAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=upgradeItem.d.ts.map