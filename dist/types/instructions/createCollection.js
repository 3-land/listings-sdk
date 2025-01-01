import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export const layout = borsh.struct([
    types.TokenMetadata.layout("tokenMetadata"),
]);
export function createCollection(args, accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.creatorAuthority, isSigner: false, isWritable: true },
        { pubkey: accounts.metadata, isSigner: false, isWritable: true },
        { pubkey: accounts.edition, isSigner: false, isWritable: true },
        { pubkey: accounts.mint, isSigner: false, isWritable: true },
        { pubkey: accounts.tokenAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.storeAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
        {
            pubkey: accounts.tokenMetadataProgram,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: accounts.associatedTokenProgram,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: accounts.rent, isSigner: false, isWritable: false },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([156, 251, 92, 54, 233, 2, 16, 82]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        tokenMetadata: types.TokenMetadata.toEncodable(args.tokenMetadata),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
