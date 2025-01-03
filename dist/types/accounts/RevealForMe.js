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
exports.RevealForMe = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class RevealForMe {
    constructor(fields) {
        this.class = fields.class;
        this.storeHalfHash = fields.storeHalfHash;
        this.state = fields.state;
        this.creator = fields.creator;
        this.nft = fields.nft;
        this.random = fields.random;
        this.data = fields.data;
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
        if (!data.slice(0, 8).equals(RevealForMe.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = RevealForMe.layout.decode(data.slice(8));
        return new RevealForMe({
            class: types.AccountClass.fromDecoded(dec.class),
            storeHalfHash: dec.storeHalfHash,
            state: dec.state,
            creator: dec.creator,
            nft: dec.nft,
            random: dec.random,
            data: new Uint8Array(dec.data.buffer, dec.data.byteOffset, dec.data.length),
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            storeHalfHash: this.storeHalfHash,
            state: this.state,
            creator: this.creator.toString(),
            nft: this.nft.toString(),
            random: this.random,
            data: Array.from(this.data.values()),
        };
    }
    static fromJSON(obj) {
        return new RevealForMe({
            class: types.AccountClass.fromJSON(obj.class),
            storeHalfHash: obj.storeHalfHash,
            state: obj.state,
            creator: new web3_js_1.PublicKey(obj.creator),
            nft: new web3_js_1.PublicKey(obj.nft),
            random: obj.random,
            data: Uint8Array.from(obj.data),
        });
    }
}
exports.RevealForMe = RevealForMe;
RevealForMe.discriminator = Buffer.from([5, 57, 21, 62, 5, 138, 252, 237]);
RevealForMe.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.array(borsh.u8(), 4, "storeHalfHash"),
    borsh.u8("state"),
    borsh.publicKey("creator"),
    borsh.publicKey("nft"),
    borsh.u16("random"),
    borsh.vecU8("data"),
]);
//# sourceMappingURL=RevealForMe.js.map