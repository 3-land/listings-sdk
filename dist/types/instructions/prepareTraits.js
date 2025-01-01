import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export function prepareTraits(accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.packTraits, isSigner: false, isWritable: true },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([44, 242, 4, 177, 221, 243, 62, 47]);
    const data = identifier;
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
