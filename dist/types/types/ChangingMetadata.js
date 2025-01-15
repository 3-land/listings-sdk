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
exports.ChangingMetadata = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ChangingMetadata {
    constructor(fields) {
        this.edition = fields.edition;
        this.name = fields.name;
        this.uri = fields.uri;
        this.hashTraits = fields.hashTraits;
        this.afterTraits = fields.afterTraits;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("edition"),
            borsh.option(borsh.str(), "name"),
            borsh.option(borsh.str(), "uri"),
            borsh.option(borsh.u64(), "hashTraits"),
            borsh.option(borsh.str(), "afterTraits"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ChangingMetadata({
            edition: obj.edition,
            name: obj.name,
            uri: obj.uri,
            hashTraits: obj.hashTraits,
            afterTraits: obj.afterTraits,
        });
    }
    static toEncodable(fields) {
        return {
            edition: fields.edition,
            name: fields.name,
            uri: fields.uri,
            hashTraits: fields.hashTraits,
            afterTraits: fields.afterTraits,
        };
    }
    toJSON() {
        return {
            edition: this.edition.toString(),
            name: this.name,
            uri: this.uri,
            hashTraits: (this.hashTraits && this.hashTraits.toString()) || null,
            afterTraits: this.afterTraits,
        };
    }
    static fromJSON(obj) {
        return new ChangingMetadata({
            edition: new bn_js_1.default(obj.edition),
            name: obj.name,
            uri: obj.uri,
            hashTraits: (obj.hashTraits && new bn_js_1.default(obj.hashTraits)) || null,
            afterTraits: obj.afterTraits,
        });
    }
    toEncodable() {
        return ChangingMetadata.toEncodable(this);
    }
}
exports.ChangingMetadata = ChangingMetadata;
//# sourceMappingURL=ChangingMetadata.js.map