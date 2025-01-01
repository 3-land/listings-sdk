import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export function withdrawFromStore(accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.creator, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([210, 94, 98, 179, 211, 206, 143, 252]);
    const data = identifier;
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
