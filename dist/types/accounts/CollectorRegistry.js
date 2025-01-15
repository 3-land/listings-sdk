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
exports.CollectorRegistry = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class CollectorRegistry {
    constructor(fields) {
        this.class = fields.class;
        this.storeHash = fields.storeHash;
        this.creator = fields.creator;
        this.holder = fields.holder;
        this.currency = fields.currency;
        this.date = new types.IndexDate({ ...fields.date });
        this.filters = fields.filters;
        this.registryType = fields.registryType;
        this.collected = fields.collected;
        this.spent = fields.spent;
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
        if (!data.slice(0, 8).equals(CollectorRegistry.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = CollectorRegistry.layout.decode(data.slice(8));
        return new CollectorRegistry({
            class: types.AccountClass.fromDecoded(dec.class),
            storeHash: dec.storeHash,
            creator: dec.creator,
            holder: dec.holder,
            currency: dec.currency,
            date: types.IndexDate.fromDecoded(dec.date),
            filters: dec.filters,
            registryType: types.RegistryType.fromDecoded(dec.registryType),
            collected: dec.collected,
            spent: dec.spent,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            storeHash: this.storeHash.toString(),
            creator: this.creator.toString(),
            holder: this.holder.toString(),
            currency: this.currency.toString(),
            date: this.date.toJSON(),
            filters: this.filters,
            registryType: this.registryType.toJSON(),
            collected: this.collected.toString(),
            spent: this.spent.toString(),
        };
    }
    static fromJSON(obj) {
        return new CollectorRegistry({
            class: types.AccountClass.fromJSON(obj.class),
            storeHash: new bn_js_1.default(obj.storeHash),
            creator: new web3_js_1.PublicKey(obj.creator),
            holder: new web3_js_1.PublicKey(obj.holder),
            currency: new web3_js_1.PublicKey(obj.currency),
            date: types.IndexDate.fromJSON(obj.date),
            filters: obj.filters,
            registryType: types.RegistryType.fromJSON(obj.registryType),
            collected: new bn_js_1.default(obj.collected),
            spent: new bn_js_1.default(obj.spent),
        });
    }
}
exports.CollectorRegistry = CollectorRegistry;
CollectorRegistry.discriminator = Buffer.from([
    25, 164, 62, 184, 54, 145, 8, 211,
]);
CollectorRegistry.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("storeHash"),
    borsh.publicKey("creator"),
    borsh.publicKey("holder"),
    borsh.publicKey("currency"),
    types.IndexDate.layout("date"),
    borsh.array(borsh.u8(), 3, "filters"),
    types.RegistryType.layout("registryType"),
    borsh.u64("collected"),
    borsh.u64("spent"),
]);
//# sourceMappingURL=CollectorRegistry.js.map