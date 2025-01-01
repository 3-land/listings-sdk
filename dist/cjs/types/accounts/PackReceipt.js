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
exports.PackReceipt = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class PackReceipt {
    constructor(fields) {
        this.class = fields.class;
        this.cnft = fields.cnft;
        this.pack = fields.pack;
        this.creator = fields.creator;
        this.state = fields.state;
        this.cardsInside = fields.cardsInside;
        this.slot = fields.slot;
        this.created = fields.created;
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
        if (!data.slice(0, 8).equals(PackReceipt.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = PackReceipt.layout.decode(data.slice(8));
        return new PackReceipt({
            class: types.AccountClass.fromDecoded(dec.class),
            cnft: dec.cnft,
            pack: dec.pack,
            creator: dec.creator,
            state: types.PackState.fromDecoded(dec.state),
            cardsInside: dec.cardsInside,
            slot: dec.slot,
            created: dec.created,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            cnft: this.cnft.toString(),
            pack: this.pack.toString(),
            creator: this.creator.toString(),
            state: this.state.toJSON(),
            cardsInside: this.cardsInside,
            slot: this.slot.toString(),
            created: this.created,
        };
    }
    static fromJSON(obj) {
        return new PackReceipt({
            class: types.AccountClass.fromJSON(obj.class),
            cnft: new web3_js_1.PublicKey(obj.cnft),
            pack: new web3_js_1.PublicKey(obj.pack),
            creator: new web3_js_1.PublicKey(obj.creator),
            state: types.PackState.fromJSON(obj.state),
            cardsInside: obj.cardsInside,
            slot: new bn_js_1.default(obj.slot),
            created: obj.created,
        });
    }
}
exports.PackReceipt = PackReceipt;
PackReceipt.discriminator = Buffer.from([
    117, 14, 250, 166, 162, 131, 180, 180,
]);
PackReceipt.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.publicKey("cnft"),
    borsh.publicKey("pack"),
    borsh.publicKey("creator"),
    types.PackState.layout("state"),
    borsh.u8("cardsInside"),
    borsh.u64("slot"),
    borsh.u32("created"),
]);
//# sourceMappingURL=PackReceipt.js.map