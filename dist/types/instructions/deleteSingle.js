import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export function deleteSingle(accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.itemAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.itemReserveList, isSigner: false, isWritable: true },
        { pubkey: accounts.archiveDeposit, isSigner: false, isWritable: true },
        { pubkey: accounts.creatorRegistry, isSigner: false, isWritable: true },
        { pubkey: accounts.manager, isSigner: false, isWritable: false },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([232, 115, 78, 51, 158, 23, 191, 54]);
    const data = identifier;
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
