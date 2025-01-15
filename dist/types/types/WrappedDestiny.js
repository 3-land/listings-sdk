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
exports.WrappedDestiny = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class WrappedDestiny {
    constructor(fields) {
        this.pool = fields.pool;
        this.destinyType = fields.destinyType;
        this.flag1 = fields.flag1;
    }
    static layout(property) {
        return borsh.struct([borsh.publicKey("pool"), borsh.u8("destinyType"), borsh.u8("flag1")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new WrappedDestiny({
            pool: obj.pool,
            destinyType: obj.destinyType,
            flag1: obj.flag1,
        });
    }
    static toEncodable(fields) {
        return {
            pool: fields.pool,
            destinyType: fields.destinyType,
            flag1: fields.flag1,
        };
    }
    toJSON() {
        return {
            pool: this.pool.toString(),
            destinyType: this.destinyType,
            flag1: this.flag1,
        };
    }
    static fromJSON(obj) {
        return new WrappedDestiny({
            pool: new web3_js_1.PublicKey(obj.pool),
            destinyType: obj.destinyType,
            flag1: obj.flag1,
        });
    }
    toEncodable() {
        return WrappedDestiny.toEncodable(this);
    }
}
exports.WrappedDestiny = WrappedDestiny;
//# sourceMappingURL=WrappedDestiny.js.map