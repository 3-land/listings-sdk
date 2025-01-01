"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adjustDepositBurn = adjustDepositBurn;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function adjustDepositBurn(accounts, programId = programId_1.PROGRAM_ID) {
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
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=adjustDepositBurn.js.map