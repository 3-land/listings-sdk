import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export const layout = borsh.struct([
    borsh.u64("slot"),
    borsh.option(types.GlobalFee.layout(), "globalFee"),
]);
export function initialize(args, accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.holderAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.creator, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([175, 175, 109, 31, 13, 152, 155, 237]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        slot: args.slot,
        globalFee: (args.globalFee && types.GlobalFee.toEncodable(args.globalFee)) || null,
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
