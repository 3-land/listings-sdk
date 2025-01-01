import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export const layout = borsh.struct([
    borsh.u8("managerBump"),
    borsh.u32("maxDepth"),
    borsh.u32("maxBufferSize"),
    borsh.option(borsh.bool(), "public"),
]);
export function feedTree(args, accounts, programId = PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.merkleAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.merkleManager, isSigner: false, isWritable: true },
        { pubkey: accounts.lutAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.treeAuthority, isSigner: false, isWritable: true },
        { pubkey: accounts.logWrapper, isSigner: false, isWritable: false },
        { pubkey: accounts.bubblegumProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.compressionProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([51, 38, 94, 153, 131, 98, 81, 20]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        managerBump: args.managerBump,
        maxDepth: args.maxDepth,
        maxBufferSize: args.maxBufferSize,
        public: args.public,
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
