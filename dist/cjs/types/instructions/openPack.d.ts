import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface OpenPackArgs {
    root: Array<number>;
    dataHash: Array<number>;
    creatorHash: Array<number>;
    index: number;
    randomBase: BN;
    creatorAuthorityBump: number;
}
export interface OpenPackAccounts {
    treeAuthority: PublicKey;
    merkleTree: PublicKey;
    packAccount: PublicKey;
    packOpenAccount: PublicKey;
    creatorAuthority: PublicKey;
    packContent: PublicKey;
    owner: PublicKey;
    packReceipt: PublicKey;
    payer: PublicKey;
    openAuthority: PublicKey;
    bubblegumProgram: PublicKey;
    logWrapper: PublicKey;
    compressionProgram: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function openPack(args: OpenPackArgs, accounts: OpenPackAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=openPack.d.ts.map