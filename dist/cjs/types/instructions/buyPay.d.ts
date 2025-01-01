import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface BuyPayArgs {
    distributionBumps: Array<number>;
}
export interface BuyPayAccounts {
    paymentAccount: PublicKey;
    itemAccount: PublicKey;
    packAccount: PublicKey;
    burnDeposit: PublicKey;
    poolVault: PublicKey;
    holderAccount: PublicKey;
    /** CHECK */
    owner: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function buyPay(args: BuyPayArgs, accounts: BuyPayAccounts, extraAccounts: any[], programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=buyPay.d.ts.map