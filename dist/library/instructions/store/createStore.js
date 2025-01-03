"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStoreInstruction = createStoreInstruction;
const web3_js_1 = require("@solana/web3.js");
const programId_1 = require("../../../types/programId");
const instructions_1 = require("../../../types/instructions");
function createStoreInstruction(holderAccount, storeAccount, creator, name, storeConfig, storeId) {
    return (0, instructions_1.createStore)({ name, storeConfig, storeId }, { holderAccount, storeAccount, creator, systemProgram: web3_js_1.PublicKey.default }, programId_1.PROGRAM_ID);
}
//# sourceMappingURL=createStore.js.map