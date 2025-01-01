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
exports.ThreeId = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class ThreeId {
    constructor(fields) {
        this.class = fields.class;
        this.holderHash = fields.holderHash;
        this.creator = fields.creator;
        this.lutAccount = fields.lutAccount;
        this.points1 = fields.points1;
        this.points2 = fields.points2;
        this.coin1 = fields.coin1;
        this.coin2 = fields.coin2;
        this.settings = fields.settings;
        this.subwallets = fields.subwallets;
        this.username = fields.username;
        this.generalStore = fields.generalStore;
        this.extra = fields.extra;
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
        if (!data.slice(0, 8).equals(ThreeId.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = ThreeId.layout.decode(data.slice(8));
        return new ThreeId({
            class: types.AccountClass.fromDecoded(dec.class),
            holderHash: dec.holderHash,
            creator: dec.creator,
            lutAccount: dec.lutAccount,
            points1: dec.points1,
            points2: dec.points2,
            coin1: dec.coin1,
            coin2: dec.coin2,
            settings: dec.settings,
            subwallets: dec.subwallets,
            username: dec.username,
            generalStore: dec.generalStore.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.GeneralStore.fromDecoded(item)),
            extra: dec.extra,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            holderHash: this.holderHash.toString(),
            creator: this.creator.toString(),
            lutAccount: this.lutAccount.toString(),
            points1: this.points1.toString(),
            points2: this.points2.toString(),
            coin1: this.coin1,
            coin2: this.coin2,
            settings: this.settings,
            subwallets: this.subwallets.map((item) => item.toString()),
            username: this.username,
            generalStore: this.generalStore.map((item) => item.toJSON()),
            extra: this.extra,
        };
    }
    static fromJSON(obj) {
        return new ThreeId({
            class: types.AccountClass.fromJSON(obj.class),
            holderHash: new bn_js_1.default(obj.holderHash),
            creator: new web3_js_1.PublicKey(obj.creator),
            lutAccount: new web3_js_1.PublicKey(obj.lutAccount),
            points1: new bn_js_1.default(obj.points1),
            points2: new bn_js_1.default(obj.points2),
            coin1: obj.coin1,
            coin2: obj.coin2,
            settings: obj.settings,
            subwallets: obj.subwallets.map((item) => new web3_js_1.PublicKey(item)),
            username: obj.username,
            generalStore: obj.generalStore.map((item) => types.GeneralStore.fromJSON(item)),
            extra: obj.extra,
        });
    }
}
exports.ThreeId = ThreeId;
ThreeId.discriminator = Buffer.from([123, 56, 150, 21, 8, 4, 144, 81]);
ThreeId.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("holderHash"),
    borsh.publicKey("creator"),
    borsh.publicKey("lutAccount"),
    borsh.u64("points1"),
    borsh.u64("points2"),
    borsh.u32("coin1"),
    borsh.u32("coin2"),
    borsh.array(borsh.u8(), 8, "settings"),
    borsh.vec(borsh.publicKey(), "subwallets"),
    borsh.str("username"),
    borsh.vec(types.GeneralStore.layout(), "generalStore"),
    borsh.array(borsh.u8(), 32, "extra"),
]);
//# sourceMappingURL=ThreeId.js.map