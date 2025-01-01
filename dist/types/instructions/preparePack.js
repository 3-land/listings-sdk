import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export const layout = borsh.struct([
    borsh.u64("supply"),
    borsh.u64("identifier"),
]);
export function preparePack(args, accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.packAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.packContent, isSigner: false, isWritable: true },
        { pubkey: accounts.creator, isSigner: false, isWritable: false },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([246, 136, 88, 116, 22, 62, 30, 154]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        supply: args.supply,
        identifier: args.identifier,
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
