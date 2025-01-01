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
exports.PackOpenHolder = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class PackOpenHolder {
    constructor(fields) {
        this.class = fields.class;
        this.state = fields.state;
        this.pack = fields.pack;
        this.creator = fields.creator;
        this.claimer = fields.claimer;
        this.packType = fields.packType;
        this.items = fields.items.map((item) => new types.SelectedCard({ ...item }));
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
        if (!data.slice(0, 8).equals(PackOpenHolder.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = PackOpenHolder.layout.decode(data.slice(8));
        return new PackOpenHolder({
            class: types.AccountClass.fromDecoded(dec.class),
            state: types.PackOpenHolderState.fromDecoded(dec.state),
            pack: dec.pack,
            creator: dec.creator,
            claimer: dec.claimer,
            packType: types.PackType.fromDecoded(dec.packType),
            items: dec.items.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.SelectedCard.fromDecoded(item)),
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            state: this.state.toJSON(),
            pack: this.pack.toString(),
            creator: this.creator.toString(),
            claimer: this.claimer.toString(),
            packType: this.packType.toJSON(),
            items: this.items.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new PackOpenHolder({
            class: types.AccountClass.fromJSON(obj.class),
            state: types.PackOpenHolderState.fromJSON(obj.state),
            pack: new web3_js_1.PublicKey(obj.pack),
            creator: new web3_js_1.PublicKey(obj.creator),
            claimer: new web3_js_1.PublicKey(obj.claimer),
            packType: types.PackType.fromJSON(obj.packType),
            items: obj.items.map((item) => types.SelectedCard.fromJSON(item)),
        });
    }
}
exports.PackOpenHolder = PackOpenHolder;
PackOpenHolder.discriminator = Buffer.from([
    54, 190, 160, 171, 255, 212, 144, 120,
]);
PackOpenHolder.layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.PackOpenHolderState.layout("state"),
    borsh.publicKey("pack"),
    borsh.publicKey("creator"),
    borsh.publicKey("claimer"),
    types.PackType.layout("packType"),
    borsh.vec(types.SelectedCard.layout(), "items"),
]);
//# sourceMappingURL=PackOpenHolder.js.map