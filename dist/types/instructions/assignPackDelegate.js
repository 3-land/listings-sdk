import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export function assignPackDelegate(accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.storeAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.delegateAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([198, 232, 96, 161, 111, 26, 135, 46]);
    const data = identifier;
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
