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
exports.Currency = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class Currency {
    constructor(fields) {
        this.address = fields.address;
        this.deposit = fields.deposit;
        this.secured = fields.secured;
        this.decimals = fields.decimals;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("address"),
            borsh.u64("deposit"),
            borsh.u64("secured"),
            borsh.u8("decimals"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Currency({
            address: obj.address,
            deposit: obj.deposit,
            secured: obj.secured,
            decimals: obj.decimals,
        });
    }
    static toEncodable(fields) {
        return {
            address: fields.address,
            deposit: fields.deposit,
            secured: fields.secured,
            decimals: fields.decimals,
        };
    }
    toJSON() {
        return {
            address: this.address.toString(),
            deposit: this.deposit.toString(),
            secured: this.secured.toString(),
            decimals: this.decimals,
        };
    }
    static fromJSON(obj) {
        return new Currency({
            address: new web3_js_1.PublicKey(obj.address),
            deposit: new bn_js_1.default(obj.deposit),
            secured: new bn_js_1.default(obj.secured),
            decimals: obj.decimals,
        });
    }
    toEncodable() {
        return Currency.toEncodable(this);
    }
}
exports.Currency = Currency;
//# sourceMappingURL=Currency.js.map