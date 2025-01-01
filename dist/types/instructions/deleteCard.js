import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export function deleteCard(accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.packContent, isSigner: false, isWritable: true },
        { pubkey: accounts.cardAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.manager, isSigner: false, isWritable: true },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([199, 58, 181, 228, 23, 155, 200, 173]);
    const data = identifier;
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
