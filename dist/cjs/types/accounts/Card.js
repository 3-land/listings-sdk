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
exports.Card = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class Card {
    constructor(fields) {
        this.class = fields.class;
        this.globalState = fields.globalState;
        this.store = fields.store;
        this.creator = fields.creator;
        this.holder = fields.holder;
        this.hash = fields.hash;
        this.page = fields.page;
        this.manager = fields.manager;
        this.index = fields.index;
        this.hashTraits = fields.hashTraits;
        this.created = fields.created;
        this.reserved = fields.reserved;
        this.item = new types.Item({ ...fields.item });
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
        if (!data.slice(0, 8).equals(Card.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = Card.layout.decode(data.slice(8));
        return new Card({
            class: types.AccountClass.fromDecoded(dec.class),
            globalState: types.GlobalState.fromDecoded(dec.globalState),
            store: dec.store,
            creator: dec.creator,
            holder: dec.holder,
            hash: dec.hash,
            page: dec.page,
            manager: dec.manager,
            index: dec.index,
            hashTraits: dec.hashTraits,
            created: dec.created,
            reserved: dec.reserved,
            item: types.Item.fromDecoded(dec.item),
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            globalState: this.globalState.toJSON(),
            store: this.store.toString(),
            creator: this.creator.toString(),
            holder: this.holder.toString(),
            hash: this.hash.toString(),
            page: this.page.toString(),
            manager: this.manager.toString(),
            index: this.index,
            hashTraits: this.hashTraits.toString(),
            created: this.created,
            reserved: this.reserved,
            item: this.item.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new Card({
            class: types.AccountClass.fromJSON(obj.class),
            globalState: types.GlobalState.fromJSON(obj.globalState),
            store: new web3_js_1.PublicKey(obj.store),
            creator: new web3_js_1.PublicKey(obj.creator),
            holder: new web3_js_1.PublicKey(obj.holder),
            hash: new bn_js_1.default(obj.hash),
            page: new bn_js_1.default(obj.page),
            manager: new web3_js_1.PublicKey(obj.manager),
            index: obj.index,
            hashTraits: new bn_js_1.default(obj.hashTraits),
            created: obj.created,
            reserved: obj.reserved,
            item: types.Item.fromJSON(obj.item),
        });
    }
}
exports.Card = Card;
Card.discriminator = Buffer.from([
    166, 250, 46, 230, 152, 63, 140, 182,
]);
Card.layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.GlobalState.layout("globalState"),
    borsh.publicKey("store"),
    borsh.publicKey("creator"),
    borsh.publicKey("holder"),
    borsh.u64("hash"),
    borsh.u64("page"),
    borsh.publicKey("manager"),
    borsh.u16("index"),
    borsh.u64("hashTraits"),
    borsh.u32("created"),
    borsh.array(borsh.u8(), 16, "reserved"),
    types.Item.layout("item"),
]);
//# sourceMappingURL=Card.js.map