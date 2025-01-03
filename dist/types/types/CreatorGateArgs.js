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
exports.CreatorGateArgs = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class CreatorGateArgs {
    constructor(fields) {
        this.key = fields.key;
    }
    static layout(property) {
        return borsh.struct([borsh.publicKey("key")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CreatorGateArgs({
            key: obj.key,
        });
    }
    static toEncodable(fields) {
        return {
            key: fields.key,
        };
    }
    toJSON() {
        return {
            key: this.key.toString(),
        };
    }
    static fromJSON(obj) {
        return new CreatorGateArgs({
            key: new web3_js_1.PublicKey(obj.key),
        });
    }
    toEncodable() {
        return CreatorGateArgs.toEncodable(this);
    }
}
exports.CreatorGateArgs = CreatorGateArgs;
//# sourceMappingURL=CreatorGateArgs.js.map