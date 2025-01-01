import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export function deleteTokenLauncher(accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.tokenManager, isSigner: false, isWritable: true },
        { pubkey: accounts.mint, isSigner: false, isWritable: false },
        { pubkey: accounts.storeAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
        {
            pubkey: accounts.tokenMetadataProgram,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([103, 202, 101, 237, 114, 9, 41, 221]);
    const data = identifier;
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
