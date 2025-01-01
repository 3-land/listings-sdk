import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface BuyPackArgs {
    proof: types.CurrencyArtistProofFields | null;
    amountPerPack: number;
    randomBase: BN;
    fee: number;
}
export interface BuyPackAccounts {
    owner: PublicKey;
    packAccount: PublicKey;
    packOpenAccount: PublicKey;
    storeAccount: PublicKey;
    packContent: PublicKey;
    paymentAccount: PublicKey;
    claimer: PublicKey;
    buytrackAccount: PublicKey;
    payer: PublicKey;
    randomizer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function buyPack(args: BuyPackArgs, accounts: BuyPackAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=buyPack.d.ts.map