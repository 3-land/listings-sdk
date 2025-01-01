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
exports.TightCardMetadata = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class TightCardMetadata {
    constructor(fields) {
        this.traitHash = fields.traitHash;
        this.name = fields.name;
        this.arweave = fields.arweave;
        this.royalty = fields.royalty;
        this.chunkSize = fields.chunkSize;
        this.creators = fields.creators.map((item) => new types.ShortCreator({ ...item }));
        this.uploader = fields.uploader;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("traitHash"),
            borsh.str("name"),
            borsh.str("arweave"),
            borsh.u16("royalty"),
            borsh.u8("chunkSize"),
            borsh.vec(types.ShortCreator.layout(), "creators"),
            borsh.option(borsh.publicKey(), "uploader"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new TightCardMetadata({
            traitHash: obj.traitHash,
            name: obj.name,
            arweave: obj.arweave,
            royalty: obj.royalty,
            chunkSize: obj.chunkSize,
            creators: obj.creators.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.ShortCreator.fromDecoded(item)),
            uploader: obj.uploader,
        });
    }
    static toEncodable(fields) {
        return {
            traitHash: fields.traitHash,
            name: fields.name,
            arweave: fields.arweave,
            royalty: fields.royalty,
            chunkSize: fields.chunkSize,
            creators: fields.creators.map((item) => types.ShortCreator.toEncodable(item)),
            uploader: fields.uploader,
        };
    }
    toJSON() {
        return {
            traitHash: this.traitHash.toString(),
            name: this.name,
            arweave: this.arweave,
            royalty: this.royalty,
            chunkSize: this.chunkSize,
            creators: this.creators.map((item) => item.toJSON()),
            uploader: (this.uploader && this.uploader.toString()) || null,
        };
    }
    static fromJSON(obj) {
        return new TightCardMetadata({
            traitHash: new bn_js_1.default(obj.traitHash),
            name: obj.name,
            arweave: obj.arweave,
            royalty: obj.royalty,
            chunkSize: obj.chunkSize,
            creators: obj.creators.map((item) => types.ShortCreator.fromJSON(item)),
            uploader: (obj.uploader && new web3_js_1.PublicKey(obj.uploader)) || null,
        });
    }
    toEncodable() {
        return TightCardMetadata.toEncodable(this);
    }
}
exports.TightCardMetadata = TightCardMetadata;
//# sourceMappingURL=TightCardMetadata.js.map