import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export const layout = borsh.struct([borsh.u64("identifier")]);
export function closeDepositBurn(args, accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.burnDeposit, isSigner: false, isWritable: true },
        { pubkey: accounts.itemAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.storeAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.owner, isSigner: false, isWritable: true },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([196, 93, 226, 119, 194, 66, 195, 77]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        identifier: args.identifier,
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
