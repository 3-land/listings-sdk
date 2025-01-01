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
exports.Store = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class Store {
    constructor(fields) {
        this.class = fields.class;
        this.holder = fields.holder;
        this.creator = fields.creator;
        this.page = fields.page;
        this.count = fields.count;
        this.live = fields.live;
        this.name = fields.name;
        this.config = new types.StoreConfig({ ...fields.config });
        this.storeId = fields.storeId;
        this.globalFee =
            (fields.globalFee && new types.GlobalFee({ ...fields.globalFee })) || null;
        this.globalDeposit = fields.globalDeposit;
        this.cacheHolder = fields.cacheHolder;
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
        if (!data.slice(0, 8).equals(Store.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = Store.layout.decode(data.slice(8));
        return new Store({
            class: types.AccountClass.fromDecoded(dec.class),
            holder: dec.holder,
            creator: dec.creator,
            page: dec.page,
            count: dec.count,
            live: dec.live,
            name: dec.name,
            config: types.StoreConfig.fromDecoded(dec.config),
            storeId: dec.storeId,
            globalFee: (dec.globalFee && types.GlobalFee.fromDecoded(dec.globalFee)) || null,
            globalDeposit: dec.globalDeposit,
            cacheHolder: dec.cacheHolder,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            holder: this.holder.toString(),
            creator: this.creator.toString(),
            page: this.page.toString(),
            count: this.count.toString(),
            live: this.live.toString(),
            name: this.name,
            config: this.config.toJSON(),
            storeId: this.storeId,
            globalFee: (this.globalFee && this.globalFee.toJSON()) || null,
            globalDeposit: this.globalDeposit.toString(),
            cacheHolder: this.cacheHolder,
        };
    }
    static fromJSON(obj) {
        return new Store({
            class: types.AccountClass.fromJSON(obj.class),
            holder: new web3_js_1.PublicKey(obj.holder),
            creator: new web3_js_1.PublicKey(obj.creator),
            page: new bn_js_1.default(obj.page),
            count: new bn_js_1.default(obj.count),
            live: new bn_js_1.default(obj.live),
            name: obj.name,
            config: types.StoreConfig.fromJSON(obj.config),
            storeId: obj.storeId,
            globalFee: (obj.globalFee && types.GlobalFee.fromJSON(obj.globalFee)) || null,
            globalDeposit: new bn_js_1.default(obj.globalDeposit),
            cacheHolder: obj.cacheHolder,
        });
    }
}
exports.Store = Store;
Store.discriminator = Buffer.from([
    130, 48, 247, 244, 182, 191, 30, 26,
]);
Store.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.publicKey("holder"),
    borsh.publicKey("creator"),
    borsh.u64("page"),
    borsh.u64("count"),
    borsh.u64("live"),
    borsh.str("name"),
    types.StoreConfig.layout("config"),
    borsh.u16("storeId"),
    borsh.option(types.GlobalFee.layout(), "globalFee"),
    borsh.u64("globalDeposit"),
    borsh.array(borsh.u8(), 128, "cacheHolder"),
]);
//# sourceMappingURL=Store.js.map