import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface GatePayArgs {
    index: number;
    metadata: types.MetadataArgsFields;
}
export interface GatePayAccounts {
    paymentAccount: PublicKey;
    itemAccount: PublicKey;
    packAccount: PublicKey;
    holderAccount: PublicKey;
    /** CHECK */
    merkleTree: PublicKey;
    /** CHECK */
    owner: PublicKey;
    payer: PublicKey;
    bubblegumProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function gatePay(args: GatePayArgs, accounts: GatePayAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=gatePay.d.ts.map