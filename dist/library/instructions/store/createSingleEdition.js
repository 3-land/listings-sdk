"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSingleEditionInstruction = createSingleEditionInstruction;
const web3_js_1 = require("@solana/web3.js");
const programId_1 = require("../../../types/programId");
const instructions_1 = require("../../../types/instructions");
const bn_js_1 = __importDefault(require("bn.js"));
function createSingleEditionInstruction(storeAccount, itemAccount, creatorAuthority, itemReserveList, creator, payer, supply, shortMetadata, saleConfig, identifier, category, superCategory, eventCategory, hashTraits, extraAccounts) {
    try {
        return (0, instructions_1.createSingle)({
            supply: new bn_js_1.default(supply),
            shortMetadata,
            saleConfig,
            identifier: new bn_js_1.default(identifier),
            category,
            superCategory,
            eventCategory,
            hashTraits: hashTraits,
        }, {
            storeAccount,
            itemAccount,
            creatorAuthority,
            itemReserveList,
            creator,
            payer,
            systemProgram: web3_js_1.PublicKey.default,
        }, extraAccounts, programId_1.PROGRAM_ID);
    }
    catch (error) {
        console.log("error in createSingleEdition", error);
        throw error;
    }
}
//# sourceMappingURL=createSingleEdition.js.map