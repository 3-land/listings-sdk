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
exports.PackConfig = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class PackConfig {
    constructor(fields) {
        this.amountPerPack = fields.amountPerPack;
        this.chancesOfEmpty = fields.chancesOfEmpty;
        this.openAuthority = fields.openAuthority;
        this.packType = fields.packType;
        this.packRules = fields.packRules;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u8("amountPerPack"),
            borsh.u16("chancesOfEmpty"),
            borsh.publicKey("openAuthority"),
            types.PackType.layout("packType"),
            borsh.vec(types.PackRule.layout(), "packRules"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new PackConfig({
            amountPerPack: obj.amountPerPack,
            chancesOfEmpty: obj.chancesOfEmpty,
            openAuthority: obj.openAuthority,
            packType: types.PackType.fromDecoded(obj.packType),
            packRules: obj.packRules.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.PackRule.fromDecoded(item)),
        });
    }
    static toEncodable(fields) {
        return {
            amountPerPack: fields.amountPerPack,
            chancesOfEmpty: fields.chancesOfEmpty,
            openAuthority: fields.openAuthority,
            packType: fields.packType.toEncodable(),
            packRules: fields.packRules.map((item) => item.toEncodable()),
        };
    }
    toJSON() {
        return {
            amountPerPack: this.amountPerPack,
            chancesOfEmpty: this.chancesOfEmpty,
            openAuthority: this.openAuthority.toString(),
            packType: this.packType.toJSON(),
            packRules: this.packRules.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new PackConfig({
            amountPerPack: obj.amountPerPack,
            chancesOfEmpty: obj.chancesOfEmpty,
            openAuthority: new web3_js_1.PublicKey(obj.openAuthority),
            packType: types.PackType.fromJSON(obj.packType),
            packRules: obj.packRules.map((item) => types.PackRule.fromJSON(item)),
        });
    }
    toEncodable() {
        return PackConfig.toEncodable(this);
    }
}
exports.PackConfig = PackConfig;
//# sourceMappingURL=PackConfig.js.map