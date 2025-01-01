import { TransactionInstruction, } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export const layout = borsh.struct([
    borsh.array(borsh.u8(), 6, "distributionBumps"),
]);
export function buyPay(args, accounts, extraAccounts, programId = PROGRAM_ID) {
    console.log("reer: ", extraAccounts[0].pubkey);
    const keys = [
        { pubkey: accounts.paymentAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.itemAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.packAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.burnDeposit, isSigner: false, isWritable: true },
        { pubkey: accounts.poolVault, isSigner: false, isWritable: true },
        { pubkey: accounts.holderAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.owner, isSigner: false, isWritable: false },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
    ];
    console.log("keyss: ", keys.length);
    for (let item of extraAccounts) {
        keys.push({
            pubkey: item.pubkey,
            isSigner: item.isSigner,
            isWritable: item.isWritable,
        });
    }
    console.log("keyss afte: ", keys.length, keys);
    const identifier = Buffer.from([100, 229, 162, 27, 130, 173, 68, 1]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        distributionBumps: args.distributionBumps,
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({ keys, programId, data });
    return ix;
}
