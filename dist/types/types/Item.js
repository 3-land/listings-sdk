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
exports.Item = void 0;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class Item {
    constructor(fields) {
        this.metadata = new types.MetadataArgs({ ...fields.metadata });
    }
    static layout(property) {
        return borsh.struct([types.MetadataArgs.layout("metadata")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Item({
            metadata: types.MetadataArgs.fromDecoded(obj.metadata),
        });
    }
    static toEncodable(fields) {
        return {
            metadata: types.MetadataArgs.toEncodable(fields.metadata),
        };
    }
    toJSON() {
        return {
            metadata: this.metadata.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new Item({
            metadata: types.MetadataArgs.fromJSON(obj.metadata),
        });
    }
    toEncodable() {
        return Item.toEncodable(this);
    }
}
exports.Item = Item;
//# sourceMappingURL=Item.js.map