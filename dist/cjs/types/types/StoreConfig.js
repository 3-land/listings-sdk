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
exports.StoreConfig = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class StoreConfig {
    constructor(fields) {
        this.fee = fields.fee;
        this.feePercentage = fields.feePercentage;
        this.feeType = fields.feeType;
        this.trust = fields.trust;
        this.rules = fields.rules;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("fee"),
            borsh.u16("feePercentage"),
            types.FeeType.layout("feeType"),
            borsh.publicKey("trust"),
            borsh.vec(types.StoreRule.layout(), "rules"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new StoreConfig({
            fee: obj.fee,
            feePercentage: obj.feePercentage,
            feeType: types.FeeType.fromDecoded(obj.feeType),
            trust: obj.trust,
            rules: obj.rules.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.StoreRule.fromDecoded(item)),
        });
    }
    static toEncodable(fields) {
        return {
            fee: fields.fee,
            feePercentage: fields.feePercentage,
            feeType: fields.feeType.toEncodable(),
            trust: fields.trust,
            rules: fields.rules.map((item) => item.toEncodable()),
        };
    }
    toJSON() {
        return {
            fee: this.fee.toString(),
            feePercentage: this.feePercentage,
            feeType: this.feeType.toJSON(),
            trust: this.trust.toString(),
            rules: this.rules.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new StoreConfig({
            fee: new bn_js_1.default(obj.fee),
            feePercentage: obj.feePercentage,
            feeType: types.FeeType.fromJSON(obj.feeType),
            trust: new web3_js_1.PublicKey(obj.trust),
            rules: obj.rules.map((item) => types.StoreRule.fromJSON(item)),
        });
    }
    toEncodable() {
        return StoreConfig.toEncodable(this);
    }
}
exports.StoreConfig = StoreConfig;
//# sourceMappingURL=StoreConfig.js.map