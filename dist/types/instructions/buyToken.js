import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export const layout = borsh.struct([borsh.u64("amount")]);
export function buyToken(args, accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.tokenManager, isSigner: false, isWritable: true },
        { pubkey: accounts.tokenAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.tokenMintRegistry, isSigner: false, isWritable: true },
        { pubkey: accounts.tokenGlobalRegistry, isSigner: false, isWritable: true },
        { pubkey: accounts.mint, isSigner: false, isWritable: true },
        { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
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
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([138, 127, 14, 91, 38, 87, 115, 105]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        amount: args.amount,
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
