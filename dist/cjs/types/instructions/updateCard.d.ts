import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface UpdateCardArgs {
    supply: number | null;
    metadata: types.MetadataArgsFields | null;
    state: types.CardStateKind | null;
}
export interface UpdateCardAccounts {
    packAccount: PublicKey;
    cardAccount: PublicKey;
    packContent: PublicKey;
    creator: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function updateCard(args: UpdateCardArgs, accounts: UpdateCardAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=updateCard.d.ts.map