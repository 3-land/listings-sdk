import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface AddBurnArgs {
    metadata: types.MetadataArgsFields;
    randomBase: number;
}
export interface AddBurnAccounts {
    burnProgress: PublicKey;
    reserveList: PublicKey;
    itemAccount: PublicKey;
    packAccount: PublicKey;
    /** CHECK */
    owner: PublicKey;
    payer: PublicKey;
    bubblegumProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function addBurn(args: AddBurnArgs, accounts: AddBurnAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=addBurn.d.ts.map