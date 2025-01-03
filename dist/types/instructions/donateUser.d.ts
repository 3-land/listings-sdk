import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface DonateUserArgs {
    epoch: number;
    amount: BN;
    message: string;
    previousRecord: types.PreviousDonationRecordFields | null;
}
export interface DonateUserAccounts {
    donationRegistryNew: PublicKey;
    donationRegistryOld: PublicKey;
    donationRecord: PublicKey;
    currency: PublicKey;
    receiver: PublicKey;
    userActivity: PublicKey;
    storeAccount: PublicKey;
    payer: PublicKey;
    merkleTree: PublicKey;
    treeAuthority: PublicKey;
    merkleManager: PublicKey;
    logWrapper: PublicKey;
    bubblegumProgram: PublicKey;
    compressionProgram: PublicKey;
    tokenMetadataProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function donateUser(args: DonateUserArgs, accounts: DonateUserAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=donateUser.d.ts.map