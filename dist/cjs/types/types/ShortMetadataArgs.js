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
exports.ShortMetadataArgs = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ShortMetadataArgs {
    constructor(fields) {
        this.name = fields.name;
        this.uri = fields.uri;
        this.uriType = fields.uriType;
        this.sellerFeeBasisPoints = fields.sellerFeeBasisPoints;
        this.collection = fields.collection;
        this.creators = fields.creators.map((item) => new types.ShortCreator({ ...item }));
    }
    static layout(property) {
        return borsh.struct([
            borsh.str("name"),
            borsh.str("uri"),
            borsh.u8("uriType"),
            borsh.u16("sellerFeeBasisPoints"),
            borsh.publicKey("collection"),
            borsh.vec(types.ShortCreator.layout(), "creators"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ShortMetadataArgs({
            name: obj.name,
            uri: obj.uri,
            uriType: obj.uriType,
            sellerFeeBasisPoints: obj.sellerFeeBasisPoints,
            collection: obj.collection,
            creators: obj.creators.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.ShortCreator.fromDecoded(item)),
        });
    }
    static toEncodable(fields) {
        return {
            name: fields.name,
            uri: fields.uri,
            uriType: fields.uriType,
            sellerFeeBasisPoints: fields.sellerFeeBasisPoints,
            collection: fields.collection,
            creators: fields.creators.map((item) => types.ShortCreator.toEncodable(item)),
        };
    }
    toJSON() {
        return {
            name: this.name,
            uri: this.uri,
            uriType: this.uriType,
            sellerFeeBasisPoints: this.sellerFeeBasisPoints,
            collection: this.collection.toString(),
            creators: this.creators.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new ShortMetadataArgs({
            name: obj.name,
            uri: obj.uri,
            uriType: obj.uriType,
            sellerFeeBasisPoints: obj.sellerFeeBasisPoints,
            collection: new web3_js_1.PublicKey(obj.collection),
            creators: obj.creators.map((item) => types.ShortCreator.fromJSON(item)),
        });
    }
    toEncodable() {
        return ShortMetadataArgs.toEncodable(this);
    }
}
exports.ShortMetadataArgs = ShortMetadataArgs;
//# sourceMappingURL=ShortMetadataArgs.js.map