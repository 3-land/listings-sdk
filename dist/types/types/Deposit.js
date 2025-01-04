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
exports.Deposit = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class Deposit {
    constructor(fields) {
        this.depositType = fields.depositType;
        this.format = fields.format;
        this.interestHash = fields.interestHash;
        this.proofSize = fields.proofSize;
    }
    static layout(property) {
        return borsh.struct([
            types.DepositType.layout("depositType"),
            types.DepositFormat.layout("format"),
            borsh.u64("interestHash"),
            borsh.u8("proofSize"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Deposit({
            depositType: types.DepositType.fromDecoded(obj.depositType),
            format: types.DepositFormat.fromDecoded(obj.format),
            interestHash: obj.interestHash,
            proofSize: obj.proofSize,
        });
    }
    static toEncodable(fields) {
        return {
            depositType: fields.depositType.toEncodable(),
            format: fields.format.toEncodable(),
            interestHash: fields.interestHash,
            proofSize: fields.proofSize,
        };
    }
    toJSON() {
        return {
            depositType: this.depositType.toJSON(),
            format: this.format.toJSON(),
            interestHash: this.interestHash.toString(),
            proofSize: this.proofSize,
        };
    }
    static fromJSON(obj) {
        return new Deposit({
            depositType: types.DepositType.fromJSON(obj.depositType),
            format: types.DepositFormat.fromJSON(obj.format),
            interestHash: new bn_js_1.default(obj.interestHash),
            proofSize: obj.proofSize,
        });
    }
    toEncodable() {
        return Deposit.toEncodable(this);
    }
}
exports.Deposit = Deposit;
//# sourceMappingURL=Deposit.js.map