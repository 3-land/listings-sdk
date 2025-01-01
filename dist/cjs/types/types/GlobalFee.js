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
exports.GlobalFee = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class GlobalFee {
    constructor(fields) {
        this.delegate = fields.delegate;
        this.fee = fields.fee;
        this.feePercentage = fields.feePercentage;
        this.feeType = fields.feeType;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("delegate"),
            borsh.u64("fee"),
            borsh.u16("feePercentage"),
            types.FeeType.layout("feeType"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new GlobalFee({
            delegate: obj.delegate,
            fee: obj.fee,
            feePercentage: obj.feePercentage,
            feeType: types.FeeType.fromDecoded(obj.feeType),
        });
    }
    static toEncodable(fields) {
        return {
            delegate: fields.delegate,
            fee: fields.fee,
            feePercentage: fields.feePercentage,
            feeType: fields.feeType.toEncodable(),
        };
    }
    toJSON() {
        return {
            delegate: this.delegate.toString(),
            fee: this.fee.toString(),
            feePercentage: this.feePercentage,
            feeType: this.feeType.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new GlobalFee({
            delegate: new web3_js_1.PublicKey(obj.delegate),
            fee: new bn_js_1.default(obj.fee),
            feePercentage: obj.feePercentage,
            feeType: types.FeeType.fromJSON(obj.feeType),
        });
    }
    toEncodable() {
        return GlobalFee.toEncodable(this);
    }
}
exports.GlobalFee = GlobalFee;
//# sourceMappingURL=GlobalFee.js.map