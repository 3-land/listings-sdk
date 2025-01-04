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
exports.SuperCategory = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class SuperCategory {
    constructor(fields) {
        this.cat1 = fields.cat1;
        this.cat2 = fields.cat2;
    }
    static layout(property) {
        return borsh.struct([borsh.u8("cat1"), borsh.u8("cat2")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SuperCategory({
            cat1: obj.cat1,
            cat2: obj.cat2,
        });
    }
    static toEncodable(fields) {
        return {
            cat1: fields.cat1,
            cat2: fields.cat2,
        };
    }
    toJSON() {
        return {
            cat1: this.cat1,
            cat2: this.cat2,
        };
    }
    static fromJSON(obj) {
        return new SuperCategory({
            cat1: obj.cat1,
            cat2: obj.cat2,
        });
    }
    toEncodable() {
        return SuperCategory.toEncodable(this);
    }
}
exports.SuperCategory = SuperCategory;
//# sourceMappingURL=SuperCategory.js.map