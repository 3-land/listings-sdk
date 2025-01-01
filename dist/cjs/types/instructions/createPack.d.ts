import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface CreatePackArgs {
    metadata: types.MetadataArgsFields;
    saleConfig: types.SaleConfigFields;
    identifier: BN;
    category: Array<number>;
    superCategory: Array<number>;
    eventCategory: number;
    hashTraits: BN;
    packConfig: types.PackConfigFields;
}
export interface CreatePackAccounts {
    storeAccount: PublicKey;
    creatorAuthority: PublicKey;
    packAccount: PublicKey;
    packReserveList: PublicKey;
    creator: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function createPack(args: CreatePackArgs, accounts: CreatePackAccounts, programId?: PublicKey): TransactionInstruction;
