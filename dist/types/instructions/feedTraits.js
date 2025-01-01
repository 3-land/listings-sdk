import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export const layout = borsh.struct([types.FeedingTraits.layout("traits")]);
export function feedTraits(args, accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.packTraits, isSigner: false, isWritable: true },
        { pubkey: accounts.packTraitsRegistry, isSigner: false, isWritable: true },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([105, 113, 240, 80, 105, 198, 78, 164]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        traits: types.FeedingTraits.toEncodable(args.traits),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
