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
exports.BurnProgress = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class BurnProgress {
    constructor(fields) {
        this.id = fields.id;
        this.burns = fields.burns;
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
        if (!data.slice(0, 8).equals(BurnProgress.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = BurnProgress.layout.decode(data.slice(8));
        return new BurnProgress({
            id: dec.id,
            burns: dec.burns,
        });
    }
    toJSON() {
        return {
            id: this.id,
            burns: this.burns.toString(),
        };
    }
    static fromJSON(obj) {
        return new BurnProgress({
            id: obj.id,
            burns: new web3_js_1.PublicKey(obj.burns),
        });
    }
}
exports.BurnProgress = BurnProgress;
BurnProgress.discriminator = Buffer.from([
    12, 198, 91, 240, 229, 209, 22, 141,
]);
BurnProgress.layout = borsh.struct([
    borsh.u16("id"),
    borsh.publicKey("burns"),
]);
//# sourceMappingURL=BurnProgress.js.map