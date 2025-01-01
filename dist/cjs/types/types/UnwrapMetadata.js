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
exports.UnwrapMetadata = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class UnwrapMetadata {
    constructor(fields) {
        this.wrappedAmount = fields.wrappedAmount;
        this.decimals = fields.decimals;
        this.traitHash = fields.traitHash;
        this.name = fields.name;
        this.arweave = fields.arweave;
        this.edition = fields.edition;
        this.leafIndex = fields.leafIndex;
        this.cardIndex = fields.cardIndex;
        this.royalty = fields.royalty;
        this.creators = fields.creators.map((item) => new types.ShortCreator({ ...item }));
        this.bumps = fields.bumps;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("wrappedAmount"),
            borsh.u8("decimals"),
            borsh.u64("traitHash"),
            borsh.str("name"),
            borsh.str("arweave"),
            borsh.u32("edition"),
            borsh.u32("leafIndex"),
            borsh.option(borsh.u32(), "cardIndex"),
            borsh.u16("royalty"),
            borsh.vec(types.ShortCreator.layout(), "creators"),
            borsh.array(borsh.u8(), 2, "bumps"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new UnwrapMetadata({
            wrappedAmount: obj.wrappedAmount,
            decimals: obj.decimals,
            traitHash: obj.traitHash,
            name: obj.name,
            arweave: obj.arweave,
            edition: obj.edition,
            leafIndex: obj.leafIndex,
            cardIndex: obj.cardIndex,
            royalty: obj.royalty,
            creators: obj.creators.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.ShortCreator.fromDecoded(item)),
            bumps: obj.bumps,
        });
    }
    static toEncodable(fields) {
        return {
            wrappedAmount: fields.wrappedAmount,
            decimals: fields.decimals,
            traitHash: fields.traitHash,
            name: fields.name,
            arweave: fields.arweave,
            edition: fields.edition,
            leafIndex: fields.leafIndex,
            cardIndex: fields.cardIndex,
            royalty: fields.royalty,
            creators: fields.creators.map((item) => types.ShortCreator.toEncodable(item)),
            bumps: fields.bumps,
        };
    }
    toJSON() {
        return {
            wrappedAmount: this.wrappedAmount.toString(),
            decimals: this.decimals,
            traitHash: this.traitHash.toString(),
            name: this.name,
            arweave: this.arweave,
            edition: this.edition,
            leafIndex: this.leafIndex,
            cardIndex: this.cardIndex,
            royalty: this.royalty,
            creators: this.creators.map((item) => item.toJSON()),
            bumps: this.bumps,
        };
    }
    static fromJSON(obj) {
        return new UnwrapMetadata({
            wrappedAmount: new bn_js_1.default(obj.wrappedAmount),
            decimals: obj.decimals,
            traitHash: new bn_js_1.default(obj.traitHash),
            name: obj.name,
            arweave: obj.arweave,
            edition: obj.edition,
            leafIndex: obj.leafIndex,
            cardIndex: obj.cardIndex,
            royalty: obj.royalty,
            creators: obj.creators.map((item) => types.ShortCreator.fromJSON(item)),
            bumps: obj.bumps,
        });
    }
    toEncodable() {
        return UnwrapMetadata.toEncodable(this);
    }
}
exports.UnwrapMetadata = UnwrapMetadata;
//# sourceMappingURL=UnwrapMetadata.js.map