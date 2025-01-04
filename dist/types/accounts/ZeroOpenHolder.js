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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeroOpenHolder = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class ZeroOpenHolder {
    constructor(fields) {
        this.class = fields.class;
        this.storeHalfHash = fields.storeHalfHash;
        this.state = fields.state;
        this.paidFee = fields.paidFee;
        this.pack = fields.pack;
        this.creator = fields.creator;
        this.claimer = fields.claimer;
        this.randomBase = fields.randomBase;
        this.packType = fields.packType;
        this.sendToVault =
            (fields.sendToVault &&
                new types.MemeVaultProof({ ...fields.sendToVault })) ||
                null;
        this.items = fields.items.map((item) => new types.SelectedZeroCard({ ...item }));
    }
    static async fetch(c, address, programId = programId_1.PROGRAM_ID) {
        const info = await c.getAccountInfo(address);
        if (info === null) {
            return null;
        }
        if (!info.owner.equals(programId)) {
            throw new Error("account doesn't belong to this program");
        }
        return this.decode(info.data);
    }
    static async fetchMultiple(c, addresses, programId = programId_1.PROGRAM_ID) {
        const infos = await c.getMultipleAccountsInfo(addresses);
        return infos.map((info) => {
            if (info === null) {
                return null;
            }
            if (!info.owner.equals(programId)) {
                throw new Error("account doesn't belong to this program");
            }
            return this.decode(info.data);
        });
    }
    static decode(data) {
        if (!data.slice(0, 8).equals(ZeroOpenHolder.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = ZeroOpenHolder.layout.decode(data.slice(8));
        return new ZeroOpenHolder({
            class: types.AccountClass.fromDecoded(dec.class),
            storeHalfHash: dec.storeHalfHash,
            state: types.PackOpenHolderState.fromDecoded(dec.state),
            paidFee: dec.paidFee,
            pack: dec.pack,
            creator: dec.creator,
            claimer: dec.claimer,
            randomBase: dec.randomBase,
            packType: types.PackType.fromDecoded(dec.packType),
            sendToVault: (dec.sendToVault &&
                types.MemeVaultProof.fromDecoded(dec.sendToVault)) ||
                null,
            items: dec.items.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.SelectedZeroCard.fromDecoded(item)),
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            storeHalfHash: this.storeHalfHash,
            state: this.state.toJSON(),
            paidFee: this.paidFee,
            pack: this.pack.toString(),
            creator: this.creator.toString(),
            claimer: this.claimer.toString(),
            randomBase: this.randomBase.toString(),
            packType: this.packType.toJSON(),
            sendToVault: (this.sendToVault && this.sendToVault.toJSON()) || null,
            items: this.items.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new ZeroOpenHolder({
            class: types.AccountClass.fromJSON(obj.class),
            storeHalfHash: obj.storeHalfHash,
            state: types.PackOpenHolderState.fromJSON(obj.state),
            paidFee: obj.paidFee,
            pack: new web3_js_1.PublicKey(obj.pack),
            creator: new web3_js_1.PublicKey(obj.creator),
            claimer: new web3_js_1.PublicKey(obj.claimer),
            randomBase: new bn_js_1.default(obj.randomBase),
            packType: types.PackType.fromJSON(obj.packType),
            sendToVault: (obj.sendToVault && types.MemeVaultProof.fromJSON(obj.sendToVault)) ||
                null,
            items: obj.items.map((item) => types.SelectedZeroCard.fromJSON(item)),
        });
    }
}
exports.ZeroOpenHolder = ZeroOpenHolder;
ZeroOpenHolder.discriminator = Buffer.from([
    106, 194, 12, 193, 165, 210, 56, 2,
]);
ZeroOpenHolder.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.array(borsh.u8(), 4, "storeHalfHash"),
    types.PackOpenHolderState.layout("state"),
    borsh.u8("paidFee"),
    borsh.publicKey("pack"),
    borsh.publicKey("creator"),
    borsh.publicKey("claimer"),
    borsh.u64("randomBase"),
    types.PackType.layout("packType"),
    borsh.option(types.MemeVaultProof.layout(), "sendToVault"),
    borsh.vec(types.SelectedZeroCard.layout(), "items"),
]);
//# sourceMappingURL=ZeroOpenHolder.js.map