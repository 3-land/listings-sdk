import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface CreateSingleArgs {
    supply: BN;
    shortMetadata: types.ShortMetadataArgsFields;
    saleConfig: types.SaleConfigFields;
    identifier: BN;
    category: Array<number>;
    superCategory: Array<number>;
    eventCategory: number;
    hashTraits: BN;
}
export interface CreateSingleAccounts {
    storeAccount: PublicKey;
    itemAccount: PublicKey;
    creatorAuthority: PublicKey;
    itemReserveList: PublicKey;
    creator: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function createSingle(args: CreateSingleArgs, accounts: CreateSingleAccounts, extraAccounts?: any[], programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=createSingle.d.ts.map