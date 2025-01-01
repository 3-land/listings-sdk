import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface CreateZeroCardArgs {
    metadatas: Array<types.ShortMetadataFields>;
    bumps: Array<number>;
    extras: Array<number>;
    config: types.ZeroConfigFields | null;
}
export interface CreateZeroCardAccounts {
    packAccount: PublicKey;
    packTraits: PublicKey;
    merkleTree: PublicKey;
    merkleManager: PublicKey;
    packContent: PublicKey;
    treeAuthority: PublicKey;
    logWrapper: PublicKey;
    bubblegumProgram: PublicKey;
    compressionProgram: PublicKey;
    tokenMetadataProgram: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function createZeroCard(args: CreateZeroCardArgs, accounts: CreateZeroCardAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=createZeroCard.d.ts.map