import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export const layout = borsh.struct([
    borsh.u64("price"),
    borsh.u8("decimals"),
    types.TokenMetadata.layout("tokenMetadata"),
    borsh.u16("share"),
    types.TokenType.layout("tokenType"),
]);
export function createTokenLauncher(args, accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.tokenManager, isSigner: false, isWritable: true },
        { pubkey: accounts.metadata, isSigner: false, isWritable: true },
        { pubkey: accounts.mint, isSigner: false, isWritable: true },
        { pubkey: accounts.tokenAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.storeTokenAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.genericUser, isSigner: false, isWritable: true },
        { pubkey: accounts.storeAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
        {
            pubkey: accounts.associatedTokenProgram,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: accounts.tokenMetadataProgram,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: accounts.rent, isSigner: false, isWritable: false },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([190, 234, 150, 230, 47, 143, 184, 87]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        price: args.price,
        decimals: args.decimals,
        tokenMetadata: types.TokenMetadata.toEncodable(args.tokenMetadata),
        share: args.share,
        tokenType: args.tokenType.toEncodable(),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
