import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface UpdateSingleArgs {
    supply: BN | null;
    metadata: types.MetadataArgsFields | null;
    saleConfig: types.SaleConfigFields | null;
    state: types.ItemStateKind | null;
    category: Array<number> | null;
}
export interface UpdateSingleAccounts {
    storeAccount: PublicKey;
    itemAccount: PublicKey;
    itemReserveList: PublicKey;
    prevCreatorRegistry: PublicKey;
    creator: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function updateSingle(args: UpdateSingleArgs, accounts: UpdateSingleAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=updateSingle.d.ts.map