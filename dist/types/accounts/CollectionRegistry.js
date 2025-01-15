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
exports.CollectionRegistry = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class CollectionRegistry {
    constructor(fields) {
        this.class = fields.class;
        this.storeHash = fields.storeHash;
        this.currency = fields.currency;
        this.collection = fields.collection;
        this.donations = fields.donations;
        this.date = new types.IndexDate({ ...fields.date });
        this.filters = fields.filters;
        this.created = fields.created;
        this.sold = fields.sold;
        this.earned = fields.earned;
        this.collectors = fields.collectors;
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
        if (!data.slice(0, 8).equals(CollectionRegistry.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = CollectionRegistry.layout.decode(data.slice(8));
        return new CollectionRegistry({
            class: types.AccountClass.fromDecoded(dec.class),
            storeHash: dec.storeHash,
            currency: dec.currency,
            collection: dec.collection,
            donations: dec.donations,
            date: types.IndexDate.fromDecoded(dec.date),
            filters: dec.filters,
            created: dec.created,
            sold: dec.sold,
            earned: dec.earned,
            collectors: dec.collectors,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            storeHash: this.storeHash.toString(),
            currency: this.currency.toString(),
            collection: this.collection.toString(),
            donations: this.donations.toString(),
            date: this.date.toJSON(),
            filters: this.filters,
            created: this.created.toString(),
            sold: this.sold.toString(),
            earned: this.earned.toString(),
            collectors: this.collectors.toString(),
        };
    }
    static fromJSON(obj) {
        return new CollectionRegistry({
            class: types.AccountClass.fromJSON(obj.class),
            storeHash: new bn_js_1.default(obj.storeHash),
            currency: new web3_js_1.PublicKey(obj.currency),
            collection: new web3_js_1.PublicKey(obj.collection),
            donations: new bn_js_1.default(obj.donations),
            date: types.IndexDate.fromJSON(obj.date),
            filters: obj.filters,
            created: new bn_js_1.default(obj.created),
            sold: new bn_js_1.default(obj.sold),
            earned: new bn_js_1.default(obj.earned),
            collectors: new bn_js_1.default(obj.collectors),
        });
    }
}
exports.CollectionRegistry = CollectionRegistry;
CollectionRegistry.discriminator = Buffer.from([
    103, 157, 231, 9, 181, 43, 15, 106,
]);
CollectionRegistry.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("storeHash"),
    borsh.publicKey("currency"),
    borsh.publicKey("collection"),
    borsh.u64("donations"),
    types.IndexDate.layout("date"),
    borsh.array(borsh.u8(), 8, "filters"),
    borsh.u64("created"),
    borsh.u64("sold"),
    borsh.u64("earned"),
    borsh.u64("collectors"),
]);
//# sourceMappingURL=CollectionRegistry.js.map