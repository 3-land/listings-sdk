import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export function adjustDepositBurn(accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.burnDeposit, isSigner: false, isWritable: true },
        { pubkey: accounts.itemAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.packAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.owner, isSigner: false, isWritable: true },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([14, 147, 177, 8, 228, 194, 77, 173]);
    const data = identifier;
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
