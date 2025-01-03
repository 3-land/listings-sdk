import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface AdjustDepositBurnAccounts {
    burnDeposit: PublicKey;
    itemAccount: PublicKey;
    packAccount: PublicKey;
    /** CHECK */
    owner: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare function adjustDepositBurn(accounts: AdjustDepositBurnAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=adjustDepositBurn.d.ts.map