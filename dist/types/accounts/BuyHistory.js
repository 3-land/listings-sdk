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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyHistory = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class BuyHistory {
    constructor(fields) {
        this.class = fields.class;
        this.buyType = fields.buyType;
        this.owner = fields.owner;
        this.item = fields.item;
        this.store = fields.store;
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
        if (!data.slice(0, 8).equals(BuyHistory.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = BuyHistory.layout.decode(data.slice(8));
        return new BuyHistory({
            class: types.AccountClass.fromDecoded(dec.class),
            buyType: types.BuyHistoryClass.fromDecoded(dec.buyType),
            owner: dec.owner,
            item: dec.item,
            store: dec.store,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            buyType: this.buyType.toJSON(),
            owner: this.owner.toString(),
            item: this.item.toString(),
            store: this.store.toString(),
        };
    }
    static fromJSON(obj) {
        return new BuyHistory({
            class: types.AccountClass.fromJSON(obj.class),
            buyType: types.BuyHistoryClass.fromJSON(obj.buyType),
            owner: new web3_js_1.PublicKey(obj.owner),
            item: new web3_js_1.PublicKey(obj.item),
            store: new web3_js_1.PublicKey(obj.store),
        });
    }
}
exports.BuyHistory = BuyHistory;
BuyHistory.discriminator = Buffer.from([
    10, 217, 83, 243, 244, 164, 203, 202,
]);
BuyHistory.layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.BuyHistoryClass.layout("buyType"),
    borsh.publicKey("owner"),
    borsh.publicKey("item"),
    borsh.publicKey("store"),
]);
//# sourceMappingURL=BuyHistory.js.map