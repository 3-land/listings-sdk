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
exports.Seed = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Seed {
    constructor(fields) {
        this.seed = fields.seed;
    }
    static layout(property) {
        return borsh.struct([borsh.vecU8("seed")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Seed({
            seed: new Uint8Array(obj.seed.buffer, obj.seed.byteOffset, obj.seed.length),
        });
    }
    static toEncodable(fields) {
        return {
            seed: Buffer.from(fields.seed.buffer, fields.seed.byteOffset, fields.seed.length),
        };
    }
    toJSON() {
        return {
            seed: Array.from(this.seed.values()),
        };
    }
    static fromJSON(obj) {
        return new Seed({
            seed: Uint8Array.from(obj.seed),
        });
    }
    toEncodable() {
        return Seed.toEncodable(this);
    }
}
exports.Seed = Seed;
//# sourceMappingURL=Seed.js.map