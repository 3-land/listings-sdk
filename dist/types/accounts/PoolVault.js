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
exports.PoolVault = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class PoolVault {
    constructor(fields) {
        this.class = fields.class;
        this.state = fields.state;
        this.storeHash = fields.storeHash;
        this.currency = fields.currency;
        this.creator = fields.creator;
        this.poolType = fields.poolType;
        this.poolHash = fields.poolHash;
        this.access = fields.access;
        this.deposit = fields.deposit;
        this.secured = fields.secured;
        this.decimals = fields.decimals;
        this.managers = fields.managers;
        this.name = fields.name;
        this.ins = fields.ins;
        this.outs = fields.outs;
        this.volumeOut = fields.volumeOut;
        this.volumeIn = fields.volumeIn;
        this.defaultCurrency = fields.defaultCurrency;
        this.createdAt = fields.createdAt;
        this.flags = fields.flags;
        this.config = fields.config;
        this.otherCurrencies = fields.otherCurrencies.map((item) => new types.Currency({ ...item }));
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
        if (!data.slice(0, 8).equals(PoolVault.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = PoolVault.layout.decode(data.slice(8));
        return new PoolVault({
            class: types.AccountClass.fromDecoded(dec.class),
            state: types.PoolState.fromDecoded(dec.state),
            storeHash: dec.storeHash,
            currency: dec.currency,
            creator: dec.creator,
            poolType: types.PoolType.fromDecoded(dec.poolType),
            poolHash: dec.poolHash,
            access: types.PoolAccess.fromDecoded(dec.access),
            deposit: dec.deposit,
            secured: dec.secured,
            decimals: dec.decimals,
            managers: dec.managers,
            name: dec.name,
            ins: dec.ins,
            outs: dec.outs,
            volumeOut: dec.volumeOut,
            volumeIn: dec.volumeIn,
            defaultCurrency: dec.defaultCurrency,
            createdAt: dec.createdAt,
            flags: dec.flags,
            config: dec.config.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.PoolConfig.fromDecoded(item)),
            otherCurrencies: dec.otherCurrencies.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.Currency.fromDecoded(item)),
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            state: this.state.toJSON(),
            storeHash: this.storeHash.toString(),
            currency: this.currency.toString(),
            creator: this.creator.toString(),
            poolType: this.poolType.toJSON(),
            poolHash: this.poolHash.toString(),
            access: this.access.toJSON(),
            deposit: this.deposit.toString(),
            secured: this.secured.toString(),
            decimals: this.decimals,
            managers: this.managers.map((item) => item.toString()),
            name: this.name,
            ins: this.ins,
            outs: this.outs,
            volumeOut: this.volumeOut.toString(),
            volumeIn: this.volumeIn.toString(),
            defaultCurrency: this.defaultCurrency,
            createdAt: this.createdAt,
            flags: this.flags,
            config: this.config.map((item) => item.toJSON()),
            otherCurrencies: this.otherCurrencies.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new PoolVault({
            class: types.AccountClass.fromJSON(obj.class),
            state: types.PoolState.fromJSON(obj.state),
            storeHash: new bn_js_1.default(obj.storeHash),
            currency: new web3_js_1.PublicKey(obj.currency),
            creator: new web3_js_1.PublicKey(obj.creator),
            poolType: types.PoolType.fromJSON(obj.poolType),
            poolHash: new bn_js_1.default(obj.poolHash),
            access: types.PoolAccess.fromJSON(obj.access),
            deposit: new bn_js_1.default(obj.deposit),
            secured: new bn_js_1.default(obj.secured),
            decimals: obj.decimals,
            managers: obj.managers.map((item) => new web3_js_1.PublicKey(item)),
            name: obj.name,
            ins: obj.ins,
            outs: obj.outs,
            volumeOut: new bn_js_1.default(obj.volumeOut),
            volumeIn: new bn_js_1.default(obj.volumeIn),
            defaultCurrency: obj.defaultCurrency,
            createdAt: obj.createdAt,
            flags: obj.flags,
            config: obj.config.map((item) => types.PoolConfig.fromJSON(item)),
            otherCurrencies: obj.otherCurrencies.map((item) => types.Currency.fromJSON(item)),
        });
    }
}
exports.PoolVault = PoolVault;
PoolVault.discriminator = Buffer.from([
    9, 184, 204, 69, 231, 82, 252, 154,
]);
PoolVault.layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.PoolState.layout("state"),
    borsh.u64("storeHash"),
    borsh.publicKey("currency"),
    borsh.publicKey("creator"),
    types.PoolType.layout("poolType"),
    borsh.u64("poolHash"),
    types.PoolAccess.layout("access"),
    borsh.u64("deposit"),
    borsh.u64("secured"),
    borsh.u8("decimals"),
    borsh.vec(borsh.publicKey(), "managers"),
    borsh.str("name"),
    borsh.u32("ins"),
    borsh.u32("outs"),
    borsh.u64("volumeOut"),
    borsh.u64("volumeIn"),
    borsh.u8("defaultCurrency"),
    borsh.u32("createdAt"),
    borsh.array(borsh.u8(), 3, "flags"),
    borsh.vec(types.PoolConfig.layout(), "config"),
    borsh.vec(types.Currency.layout(), "otherCurrencies"),
]);
//# sourceMappingURL=PoolVault.js.map