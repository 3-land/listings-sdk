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
exports.WrappedSource = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class WrappedSource {
    constructor(fields) {
        this.pool = fields.pool;
        this.amount = fields.amount;
        this.distribution = fields.distribution;
        this.track = fields.track;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("pool"),
            borsh.u64("amount"),
            borsh.u16("distribution"),
            borsh.u8("track"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new WrappedSource({
            pool: obj.pool,
            amount: obj.amount,
            distribution: obj.distribution,
            track: obj.track,
        });
    }
    static toEncodable(fields) {
        return {
            pool: fields.pool,
            amount: fields.amount,
            distribution: fields.distribution,
            track: fields.track,
        };
    }
    toJSON() {
        return {
            pool: this.pool.toString(),
            amount: this.amount.toString(),
            distribution: this.distribution,
            track: this.track,
        };
    }
    static fromJSON(obj) {
        return new WrappedSource({
            pool: new web3_js_1.PublicKey(obj.pool),
            amount: new bn_js_1.default(obj.amount),
            distribution: obj.distribution,
            track: obj.track,
        });
    }
    toEncodable() {
        return WrappedSource.toEncodable(this);
    }
}
exports.WrappedSource = WrappedSource;
//# sourceMappingURL=WrappedSource.js.map