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
exports.Uses = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class Uses {
    constructor(fields) {
        this.useMethod = fields.useMethod;
        this.remaining = fields.remaining;
        this.total = fields.total;
    }
    static layout(property) {
        return borsh.struct([
            types.UseMethod.layout("useMethod"),
            borsh.u64("remaining"),
            borsh.u64("total"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Uses({
            useMethod: types.UseMethod.fromDecoded(obj.useMethod),
            remaining: obj.remaining,
            total: obj.total,
        });
    }
    static toEncodable(fields) {
        return {
            useMethod: fields.useMethod.toEncodable(),
            remaining: fields.remaining,
            total: fields.total,
        };
    }
    toJSON() {
        return {
            useMethod: this.useMethod.toJSON(),
            remaining: this.remaining.toString(),
            total: this.total.toString(),
        };
    }
    static fromJSON(obj) {
        return new Uses({
            useMethod: types.UseMethod.fromJSON(obj.useMethod),
            remaining: new bn_js_1.default(obj.remaining),
            total: new bn_js_1.default(obj.total),
        });
    }
    toEncodable() {
        return Uses.toEncodable(this);
    }
}
exports.Uses = Uses;
//# sourceMappingURL=Uses.js.map