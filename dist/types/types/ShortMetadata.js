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
exports.ShortMetadata = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ShortMetadata {
    constructor(fields) {
        this.index = fields.index;
        this.supply = fields.supply;
        this.traitHash = fields.traitHash;
        this.name = fields.name;
        this.arweave = fields.arweave;
        this.traitPass =
            (fields.traitPass && new types.TraitPass({ ...fields.traitPass })) || null;
        this.royalty = fields.royalty;
        this.creators =
            (fields.creators &&
                fields.creators.map((item) => new types.ShortCreator({ ...item }))) ||
                null;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u32("index"),
            borsh.option(borsh.u64(), "supply"),
            borsh.u64("traitHash"),
            borsh.str("name"),
            borsh.str("arweave"),
            borsh.option(types.TraitPass.layout(), "traitPass"),
            borsh.option(borsh.u16(), "royalty"),
            borsh.option(borsh.vec(types.ShortCreator.layout()), "creators"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ShortMetadata({
            index: obj.index,
            supply: obj.supply,
            traitHash: obj.traitHash,
            name: obj.name,
            arweave: obj.arweave,
            traitPass: (obj.traitPass && types.TraitPass.fromDecoded(obj.traitPass)) || null,
            royalty: obj.royalty,
            creators: (obj.creators &&
                obj.creators.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.ShortCreator.fromDecoded(item))) ||
                null,
        });
    }
    static toEncodable(fields) {
        return {
            index: fields.index,
            supply: fields.supply,
            traitHash: fields.traitHash,
            name: fields.name,
            arweave: fields.arweave,
            traitPass: (fields.traitPass && types.TraitPass.toEncodable(fields.traitPass)) ||
                null,
            royalty: fields.royalty,
            creators: (fields.creators &&
                fields.creators.map((item) => types.ShortCreator.toEncodable(item))) ||
                null,
        };
    }
    toJSON() {
        return {
            index: this.index,
            supply: (this.supply && this.supply.toString()) || null,
            traitHash: this.traitHash.toString(),
            name: this.name,
            arweave: this.arweave,
            traitPass: (this.traitPass && this.traitPass.toJSON()) || null,
            royalty: this.royalty,
            creators: (this.creators && this.creators.map((item) => item.toJSON())) || null,
        };
    }
    static fromJSON(obj) {
        return new ShortMetadata({
            index: obj.index,
            supply: (obj.supply && new bn_js_1.default(obj.supply)) || null,
            traitHash: new bn_js_1.default(obj.traitHash),
            name: obj.name,
            arweave: obj.arweave,
            traitPass: (obj.traitPass && types.TraitPass.fromJSON(obj.traitPass)) || null,
            royalty: obj.royalty,
            creators: (obj.creators &&
                obj.creators.map((item) => types.ShortCreator.fromJSON(item))) ||
                null,
        });
    }
    toEncodable() {
        return ShortMetadata.toEncodable(this);
    }
}
exports.ShortMetadata = ShortMetadata;
//# sourceMappingURL=ShortMetadata.js.map