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
exports.printSingle = printSingle;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
exports.layout = borsh.struct([
    borsh.option(types.CurrencyArtistProof.layout(), "proof"),
    borsh.u8("storeBump"),
    borsh.u8("creatorAuthBump"),
    borsh.u8("itemBump"),
    borsh.u8("treeBump"),
    types.ExtraParameter.layout("extra"),
]);
function printSingle(args, accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.owner, isSigner: false, isWritable: false },
        { pubkey: accounts.itemAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.treeAuthority, isSigner: false, isWritable: true },
        { pubkey: accounts.storeAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.creatorAuthority, isSigner: false, isWritable: false },
        { pubkey: accounts.paymentAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.merkleTree, isSigner: false, isWritable: true },
        { pubkey: accounts.merkleManager, isSigner: false, isWritable: true },
        {
            pubkey: accounts.collectionAuthorityRecordPda,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: accounts.editionAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.collectionMetadata, isSigner: false, isWritable: true },
        { pubkey: accounts.collectionMint, isSigner: false, isWritable: false },
        { pubkey: accounts.bubblegumSigner, isSigner: false, isWritable: false },
        { pubkey: accounts.buytrackAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.revealForMe, isSigner: false, isWritable: true },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.logWrapper, isSigner: false, isWritable: false },
        { pubkey: accounts.bubblegumProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.compressionProgram, isSigner: false, isWritable: false },
        {
            pubkey: accounts.tokenMetadataProgram,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([105, 204, 23, 32, 170, 121, 225, 133]);
    const buffer = Buffer.alloc(1000);
    const len = exports.layout.encode({
        proof: (args.proof && types.CurrencyArtistProof.toEncodable(args.proof)) ||
            null,
        storeBump: args.storeBump,
        creatorAuthBump: args.creatorAuthBump,
        itemBump: args.itemBump,
        treeBump: args.treeBump,
        extra: args.extra.toEncodable(),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
//# sourceMappingURL=printSingle.js.map