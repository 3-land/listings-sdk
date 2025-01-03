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
exports.GenericUser = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class GenericUser {
    constructor(fields) {
        this.class = fields.class;
        this.subApp = fields.subApp;
        this.holderHash = fields.holderHash;
        this.category = fields.category;
        this.creator = fields.creator;
        this.lutAccount = fields.lutAccount;
        this.subWallets = fields.subWallets;
        this.extended = fields.extended;
        this.flags = fields.flags;
        this.username = fields.username;
        this.genericStore = fields.genericStore.map((item) => new types.GenericStore({ ...item }));
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
        if (!data.slice(0, 8).equals(GenericUser.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = GenericUser.layout.decode(data.slice(8));
        return new GenericUser({
            class: types.AccountClass.fromDecoded(dec.class),
            subApp: dec.subApp,
            holderHash: dec.holderHash,
            category: dec.category,
            creator: dec.creator,
            lutAccount: dec.lutAccount,
            subWallets: dec.subWallets,
            extended: dec.extended,
            flags: dec.flags,
            username: dec.username,
            genericStore: dec.genericStore.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.GenericStore.fromDecoded(item)),
            extra: dec.extra,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            subApp: this.subApp.toString(),
            holderHash: this.holderHash.toString(),
            category: this.category.toString(),
            creator: this.creator.toString(),
            lutAccount: this.lutAccount.toString(),
            subWallets: this.subWallets.map((item) => item.toString()),
            extended: this.extended,
            flags: this.flags,
            username: this.username,
            genericStore: this.genericStore.map((item) => item.toJSON()),
            extra: this.extra,
        };
    }
    static fromJSON(obj) {
        return new GenericUser({
            class: types.AccountClass.fromJSON(obj.class),
            subApp: new bn_js_1.default(obj.subApp),
            holderHash: new bn_js_1.default(obj.holderHash),
            category: new bn_js_1.default(obj.category),
            creator: new web3_js_1.PublicKey(obj.creator),
            lutAccount: new web3_js_1.PublicKey(obj.lutAccount),
            subWallets: obj.subWallets.map((item) => new web3_js_1.PublicKey(item)),
            extended: obj.extended,
            flags: obj.flags,
            username: obj.username,
            genericStore: obj.genericStore.map((item) => types.GenericStore.fromJSON(item)),
            extra: obj.extra,
        });
    }
}
exports.GenericUser = GenericUser;
GenericUser.discriminator = Buffer.from([
    222, 233, 191, 5, 55, 3, 237, 241,
]);
GenericUser.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("subApp"),
    borsh.u64("holderHash"),
    borsh.u64("category"),
    borsh.publicKey("creator"),
    borsh.publicKey("lutAccount"),
    borsh.vec(borsh.publicKey(), "subWallets"),
    borsh.u8("extended"),
    borsh.array(borsh.u8(), 8, "flags"),
    borsh.str("username"),
    borsh.vec(types.GenericStore.layout(), "genericStore"),
    borsh.array(borsh.u8(), 32, "extra"),
]);
//# sourceMappingURL=GenericUser.js.map