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
exports.PreviousDonationRecord = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class PreviousDonationRecord {
    constructor(fields) {
        this.cnft = new types.CnftData(Object.assign({}, fields.cnft));
        this.amount = fields.amount;
        this.message = fields.message;
    }
    static layout(property) {
        return borsh.struct([
            types.CnftData.layout("cnft"),
            borsh.u64("amount"),
            borsh.str("message"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new PreviousDonationRecord({
            cnft: types.CnftData.fromDecoded(obj.cnft),
            amount: obj.amount,
            message: obj.message,
        });
    }
    static toEncodable(fields) {
        return {
            cnft: types.CnftData.toEncodable(fields.cnft),
            amount: fields.amount,
            message: fields.message,
        };
    }
    toJSON() {
        return {
            cnft: this.cnft.toJSON(),
            amount: this.amount.toString(),
            message: this.message,
        };
    }
    static fromJSON(obj) {
        return new PreviousDonationRecord({
            cnft: types.CnftData.fromJSON(obj.cnft),
            amount: new bn_js_1.default(obj.amount),
            message: obj.message,
        });
    }
    toEncodable() {
        return PreviousDonationRecord.toEncodable(this);
    }
}
exports.PreviousDonationRecord = PreviousDonationRecord;
