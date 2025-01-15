"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = void 0;
exports.createSingle = createSingle;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
exports.layout = borsh.struct([
    borsh.u64("supply"),
    types.ShortMetadataArgs.layout("shortMetadata"),
    types.SaleConfig.layout("saleConfig"),
    borsh.u64("identifier"),
    borsh.array(borsh.u16(), 3, "category"),
    borsh.array(borsh.u8(), 2, "superCategory"),
    borsh.u16("eventCategory"),
    borsh.u64("hashTraits"),
]);
function createSingle(args, accounts, extraAccounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.itemAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.creatorAuthority, isSigner: false, isWritable: true },
        { pubkey: accounts.itemReserveList, isSigner: false, isWritable: true },
        { pubkey: accounts.creator, isSigner: false, isWritable: false },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    if (extraAccounts) {
        for (let item of extraAccounts) {
            keys.push({
                pubkey: item.pubkey,
                isSigner: item.isSigner,
                isWritable: item.isWritable,
            });
        }
    }
    const identifier = Buffer.from([148, 238, 14, 208, 161, 59, 195, 11]);
    const buffer = Buffer.alloc(1000);
    const len = exports.layout.encode({
        supply: args.supply,
        shortMetadata: types.ShortMetadataArgs.toEncodable(args.shortMetadata),
        saleConfig: types.SaleConfig.toEncodable(args.saleConfig),
        identifier: args.identifier,
        category: args.category,
        superCategory: args.superCategory,
        eventCategory: args.eventCategory,
        hashTraits: args.hashTraits,
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=createSingle.js.map