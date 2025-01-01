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
exports.TokenManager = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class TokenManager {
    constructor(fields) {
        this.class = fields.class;
        this.storeHash = fields.storeHash;
        this.tokenType = fields.tokenType;
        this.state = fields.state;
        this.currency = fields.currency;
        this.creator = fields.creator;
        this.communityShare = fields.communityShare;
        this.name = fields.name;
        this.base = fields.base;
        this.price = fields.price;
        this.supply = fields.supply;
        this.created = fields.created;
        this.pool = fields.pool;
        this.pending = fields.pending;
        this.taxes = fields.taxes;
        this.options = fields.options;
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
        if (!data.slice(0, 8).equals(TokenManager.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = TokenManager.layout.decode(data.slice(8));
        return new TokenManager({
            class: types.AccountClass.fromDecoded(dec.class),
            storeHash: dec.storeHash,
            tokenType: types.TokenType.fromDecoded(dec.tokenType),
            state: types.TokenState.fromDecoded(dec.state),
            currency: dec.currency,
            creator: dec.creator,
            communityShare: dec.communityShare,
            name: dec.name,
            base: dec.base,
            price: dec.price,
            supply: dec.supply,
            created: dec.created,
            pool: dec.pool,
            pending: dec.pending,
            taxes: dec.taxes,
            options: dec.options,
            extra: dec.extra,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            storeHash: this.storeHash.toString(),
            tokenType: this.tokenType.toJSON(),
            state: this.state.toJSON(),
            currency: this.currency.toString(),
            creator: this.creator.toString(),
            communityShare: this.communityShare,
            name: this.name,
            base: this.base.toString(),
            price: this.price.toString(),
            supply: this.supply.toString(),
            created: this.created.toString(),
            pool: this.pool.toString(),
            pending: this.pending.toString(),
            taxes: this.taxes,
            options: this.options,
            extra: this.extra,
        };
    }
    static fromJSON(obj) {
        return new TokenManager({
            class: types.AccountClass.fromJSON(obj.class),
            storeHash: new bn_js_1.default(obj.storeHash),
            tokenType: types.TokenType.fromJSON(obj.tokenType),
            state: types.TokenState.fromJSON(obj.state),
            currency: new web3_js_1.PublicKey(obj.currency),
            creator: new web3_js_1.PublicKey(obj.creator),
            communityShare: obj.communityShare,
            name: obj.name,
            base: new bn_js_1.default(obj.base),
            price: new bn_js_1.default(obj.price),
            supply: new bn_js_1.default(obj.supply),
            created: new bn_js_1.default(obj.created),
            pool: new bn_js_1.default(obj.pool),
            pending: new bn_js_1.default(obj.pending),
            taxes: obj.taxes,
            options: obj.options,
            extra: obj.extra,
        });
    }
}
exports.TokenManager = TokenManager;
TokenManager.discriminator = Buffer.from([
    185, 97, 124, 231, 70, 75, 228, 47,
]);
TokenManager.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("storeHash"),
    types.TokenType.layout("tokenType"),
    types.TokenState.layout("state"),
    borsh.publicKey("currency"),
    borsh.publicKey("creator"),
    borsh.u16("communityShare"),
    borsh.str("name"),
    borsh.u64("base"),
    borsh.u64("price"),
    borsh.u64("supply"),
    borsh.u64("created"),
    borsh.u64("pool"),
    borsh.u64("pending"),
    borsh.array(borsh.u16(), 4, "taxes"),
    borsh.array(borsh.u8(), 8, "options"),
    borsh.array(borsh.u8(), 64, "extra"),
]);
//# sourceMappingURL=TokenManager.js.map