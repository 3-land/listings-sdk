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
exports.VerifyCollectionMetadata = void 0;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class VerifyCollectionMetadata {
    constructor(fields) {
        this.name = fields.name;
        this.symbol = fields.symbol;
        this.uri = fields.uri;
        this.royalty = fields.royalty;
        this.collection = fields.collection;
        this.creators = fields.creators.map((item) => new types.Creator({ ...item }));
    }
    static layout(property) {
        return borsh.struct([
            borsh.str("name"),
            borsh.str("symbol"),
            borsh.str("uri"),
            borsh.u16("royalty"),
            borsh.u8("collection"),
            borsh.vec(types.Creator.layout(), "creators"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VerifyCollectionMetadata({
            name: obj.name,
            symbol: obj.symbol,
            uri: obj.uri,
            royalty: obj.royalty,
            collection: obj.collection,
            creators: obj.creators.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.Creator.fromDecoded(item)),
        });
    }
    static toEncodable(fields) {
        return {
            name: fields.name,
            symbol: fields.symbol,
            uri: fields.uri,
            royalty: fields.royalty,
            collection: fields.collection,
            creators: fields.creators.map((item) => types.Creator.toEncodable(item)),
        };
    }
    toJSON() {
        return {
            name: this.name,
            symbol: this.symbol,
            uri: this.uri,
            royalty: this.royalty,
            collection: this.collection,
            creators: this.creators.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new VerifyCollectionMetadata({
            name: obj.name,
            symbol: obj.symbol,
            uri: obj.uri,
            royalty: obj.royalty,
            collection: obj.collection,
            creators: obj.creators.map((item) => types.Creator.fromJSON(item)),
        });
    }
    toEncodable() {
        return VerifyCollectionMetadata.toEncodable(this);
    }
}
exports.VerifyCollectionMetadata = VerifyCollectionMetadata;
//# sourceMappingURL=VerifyCollectionMetadata.js.map