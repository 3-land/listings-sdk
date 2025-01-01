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
exports.FakeTraitPair = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class FakeTraitPair {
    constructor(fields) {
        this.trait_type = fields.trait_type;
        this.value = fields.value;
    }
    static layout(property) {
        return borsh.struct([borsh.str("trait_type"), borsh.str("value")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new FakeTraitPair({
            trait_type: obj.trait_type,
            value: obj.value,
        });
    }
    static toEncodable(fields) {
        return {
            trait_type: fields.trait_type,
            value: fields.value,
        };
    }
    toJSON() {
        return {
            trait_type: this.trait_type,
            value: this.value,
        };
    }
    static fromJSON(obj) {
        return new FakeTraitPair({
            trait_type: obj.trait_type,
            value: obj.value,
        });
    }
    toEncodable() {
        return FakeTraitPair.toEncodable(this);
    }
}
exports.FakeTraitPair = FakeTraitPair;
//# sourceMappingURL=FakeTraitPair.js.map