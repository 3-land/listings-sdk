import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export const layout = borsh.struct([types.Deposit.layout("deposit")]);
export function depositBurn(args, accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.newBurnDeposit, isSigner: false, isWritable: true },
        { pubkey: accounts.existingBurnDeposit, isSigner: false, isWritable: true },
        { pubkey: accounts.artistBurnTrack, isSigner: false, isWritable: true },
        { pubkey: accounts.globalBurnTrack, isSigner: false, isWritable: true },
        { pubkey: accounts.itemAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.packAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.metadataAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.owner, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([76, 167, 230, 117, 107, 157, 228, 236]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        deposit: types.Deposit.toEncodable(args.deposit),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
