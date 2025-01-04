import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface BurnPayArgs {
    metadata: types.MetadataArgsFields | null;
}
export interface BurnPayAccounts {
    paymentAccount: PublicKey;
    itemAccount: PublicKey;
    packAccount: PublicKey;
    holderAccount: PublicKey;
    /** CHECK */
    owner: PublicKey;
    payer: PublicKey;
    bubblegumProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function burnPay(args: BurnPayArgs, accounts: BurnPayAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=burnPay.d.ts.map