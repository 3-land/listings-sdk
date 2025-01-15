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
exports.UpdateMetadata = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class UpdateMetadata {
    constructor(fields) {
        this.name = fields.name;
        this.uri = fields.uri;
        this.uriType = fields.uriType;
        this.hashTraits = fields.hashTraits;
    }
    static layout(property) {
        return borsh.struct([
            borsh.str("name"),
            borsh.str("uri"),
            borsh.u8("uriType"),
            borsh.u64("hashTraits"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new UpdateMetadata({
            name: obj.name,
            uri: obj.uri,
            uriType: obj.uriType,
            hashTraits: obj.hashTraits,
        });
    }
    static toEncodable(fields) {
        return {
            name: fields.name,
            uri: fields.uri,
            uriType: fields.uriType,
            hashTraits: fields.hashTraits,
        };
    }
    toJSON() {
        return {
            name: this.name,
            uri: this.uri,
            uriType: this.uriType,
            hashTraits: this.hashTraits.toString(),
        };
    }
    static fromJSON(obj) {
        return new UpdateMetadata({
            name: obj.name,
            uri: obj.uri,
            uriType: obj.uriType,
            hashTraits: new bn_js_1.default(obj.hashTraits),
        });
    }
    toEncodable() {
        return UpdateMetadata.toEncodable(this);
    }
}
exports.UpdateMetadata = UpdateMetadata;
//# sourceMappingURL=UpdateMetadata.js.map