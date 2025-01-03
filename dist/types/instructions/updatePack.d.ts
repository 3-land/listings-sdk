import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface UpdatePackArgs {
    supply: BN | null;
    metadata: types.MetadataArgsFields | null;
    saleConfig: types.SaleConfigFields | null;
    state: types.ItemStateKind | null;
    category: Array<number> | null;
    packConfig: types.PackConfigFields | null;
}
export interface UpdatePackAccounts {
    storeAccount: PublicKey;
    packAccount: PublicKey;
    packContent: PublicKey;
    packReserveList: PublicKey;
    prevCreatorRegistry: PublicKey;
    creator: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function updatePack(args: UpdatePackArgs, accounts: UpdatePackAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=updatePack.d.ts.map