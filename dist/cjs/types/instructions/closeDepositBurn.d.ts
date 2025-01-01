import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface CloseDepositBurnArgs {
    identifier: BN;
}
export interface CloseDepositBurnAccounts {
    burnDeposit: PublicKey;
    itemAccount: PublicKey;
    storeAccount: PublicKey;
    /** CHECK */
    owner: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function closeDepositBurn(args: CloseDepositBurnArgs, accounts: CloseDepositBurnAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=closeDepositBurn.d.ts.map