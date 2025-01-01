import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export const layout = borsh.struct([
    borsh.str("name"),
    types.StoreConfig.layout("storeConfig"),
]);
export function updateStore(args, accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.holderAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.creator, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([169, 49, 137, 251, 233, 234, 172, 103]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        name: args.name,
        storeConfig: types.StoreConfig.toEncodable(args.storeConfig),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
