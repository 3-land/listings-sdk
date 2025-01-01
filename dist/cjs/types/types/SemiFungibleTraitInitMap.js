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
exports.SemiFungibleTraitInitMap = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class SemiFungibleTraitInitMap {
    constructor(fields) {
        this.hash = fields.hash;
        this.amount = fields.amount;
        this.index = fields.index;
    }
    static layout(property) {
        return borsh.struct([borsh.u64("hash"), borsh.u64("amount"), borsh.u32("index")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SemiFungibleTraitInitMap({
            hash: obj.hash,
            amount: obj.amount,
            index: obj.index,
        });
    }
    static toEncodable(fields) {
        return {
            hash: fields.hash,
            amount: fields.amount,
            index: fields.index,
        };
    }
    toJSON() {
        return {
            hash: this.hash.toString(),
            amount: this.amount.toString(),
            index: this.index,
        };
    }
    static fromJSON(obj) {
        return new SemiFungibleTraitInitMap({
            hash: new bn_js_1.default(obj.hash),
            amount: new bn_js_1.default(obj.amount),
            index: obj.index,
        });
    }
    toEncodable() {
        return SemiFungibleTraitInitMap.toEncodable(this);
    }
}
exports.SemiFungibleTraitInitMap = SemiFungibleTraitInitMap;
//# sourceMappingURL=SemiFungibleTraitInitMap.js.map