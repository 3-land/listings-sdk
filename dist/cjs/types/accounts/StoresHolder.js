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
exports.StoresHolder = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class StoresHolder {
    constructor(fields) {
        this.class = fields.class;
        this.slot = fields.slot;
        this.creator = fields.creator;
        this.count = fields.count;
        this.defaultGlobalFee =
            (fields.defaultGlobalFee &&
                new types.GlobalFee({ ...fields.defaultGlobalFee })) ||
                null;
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
        if (!data.slice(0, 8).equals(StoresHolder.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = StoresHolder.layout.decode(data.slice(8));
        return new StoresHolder({
            class: types.AccountClass.fromDecoded(dec.class),
            slot: dec.slot,
            creator: dec.creator,
            count: dec.count,
            defaultGlobalFee: (dec.defaultGlobalFee &&
                types.GlobalFee.fromDecoded(dec.defaultGlobalFee)) ||
                null,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            slot: this.slot.toString(),
            creator: this.creator.toString(),
            count: this.count.toString(),
            defaultGlobalFee: (this.defaultGlobalFee && this.defaultGlobalFee.toJSON()) || null,
        };
    }
    static fromJSON(obj) {
        return new StoresHolder({
            class: types.AccountClass.fromJSON(obj.class),
            slot: new bn_js_1.default(obj.slot),
            creator: new web3_js_1.PublicKey(obj.creator),
            count: new bn_js_1.default(obj.count),
            defaultGlobalFee: (obj.defaultGlobalFee &&
                types.GlobalFee.fromJSON(obj.defaultGlobalFee)) ||
                null,
        });
    }
}
exports.StoresHolder = StoresHolder;
StoresHolder.discriminator = Buffer.from([
    237, 16, 131, 248, 150, 182, 165, 234,
]);
StoresHolder.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("slot"),
    borsh.publicKey("creator"),
    borsh.u64("count"),
    borsh.option(types.GlobalFee.layout(), "defaultGlobalFee"),
]);
//# sourceMappingURL=StoresHolder.js.map