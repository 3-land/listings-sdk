import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export const layout = borsh.struct([
    borsh.option(borsh.u64(), "supply"),
    borsh.option(types.MetadataArgs.layout(), "metadata"),
    borsh.option(types.SaleConfig.layout(), "saleConfig"),
    borsh.option(types.ItemState.layout(), "state"),
    borsh.option(borsh.array(borsh.u16(), 3), "category"),
]);
export function updateSingle(args, accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.itemAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.itemReserveList, isSigner: false, isWritable: true },
        { pubkey: accounts.prevCreatorRegistry, isSigner: false, isWritable: true },
        { pubkey: accounts.creator, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([106, 229, 174, 154, 252, 16, 158, 144]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        supply: args.supply,
        metadata: (args.metadata && types.MetadataArgs.toEncodable(args.metadata)) ||
            null,
        saleConfig: (args.saleConfig && types.SaleConfig.toEncodable(args.saleConfig)) ||
            null,
        state: (args.state && args.state.toEncodable()) || null,
        category: args.category,
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
