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
exports.PackTraits = void 0;
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class PackTraits {
    constructor(fields) {
        this.class = fields.class;
        this.list = fields.list;
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
        if (!data.slice(0, 8).equals(PackTraits.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = PackTraits.layout.decode(data.slice(8));
        return new PackTraits({
            class: types.AccountClass.fromDecoded(dec.class),
            list: dec.list.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.TraitType.fromDecoded(item)),
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            list: this.list.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new PackTraits({
            class: types.AccountClass.fromJSON(obj.class),
            list: obj.list.map((item) => types.TraitType.fromJSON(item)),
        });
    }
}
exports.PackTraits = PackTraits;
PackTraits.discriminator = Buffer.from([
    238, 139, 229, 97, 133, 123, 168, 248,
]);
PackTraits.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.vec(types.TraitType.layout(), "list"),
]);
//# sourceMappingURL=PackTraits.js.map