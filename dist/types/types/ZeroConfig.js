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
exports.ZeroConfig = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class ZeroConfig {
    constructor(fields) {
        this.bytes = fields.bytes;
        this.chunks = fields.chunks;
        this.chunkSize = fields.chunkSize;
        this.supplyChunkBytes = fields.supplyChunkBytes;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u8("bytes"),
            borsh.array(borsh.u8(), 2, "chunks"),
            borsh.u8("chunkSize"),
            borsh.u8("supplyChunkBytes"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ZeroConfig({
            bytes: obj.bytes,
            chunks: obj.chunks,
            chunkSize: obj.chunkSize,
            supplyChunkBytes: obj.supplyChunkBytes,
        });
    }
    static toEncodable(fields) {
        return {
            bytes: fields.bytes,
            chunks: fields.chunks,
            chunkSize: fields.chunkSize,
            supplyChunkBytes: fields.supplyChunkBytes,
        };
    }
    toJSON() {
        return {
            bytes: this.bytes,
            chunks: this.chunks,
            chunkSize: this.chunkSize,
            supplyChunkBytes: this.supplyChunkBytes,
        };
    }
    static fromJSON(obj) {
        return new ZeroConfig({
            bytes: obj.bytes,
            chunks: obj.chunks,
            chunkSize: obj.chunkSize,
            supplyChunkBytes: obj.supplyChunkBytes,
        });
    }
    toEncodable() {
        return ZeroConfig.toEncodable(this);
    }
}
exports.ZeroConfig = ZeroConfig;
//# sourceMappingURL=ZeroConfig.js.map