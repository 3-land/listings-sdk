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
exports.Filter = void 0;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class Filter {
    constructor(fields) {
        this.filter1 = fields.filter1;
        this.filter2 = fields.filter2;
    }
    static layout(property) {
        return borsh.struct([types.FilterType.layout("filter1"), types.FilterType.layout("filter2")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Filter({
            filter1: types.FilterType.fromDecoded(obj.filter1),
            filter2: types.FilterType.fromDecoded(obj.filter2),
        });
    }
    static toEncodable(fields) {
        return {
            filter1: fields.filter1.toEncodable(),
            filter2: fields.filter2.toEncodable(),
        };
    }
    toJSON() {
        return {
            filter1: this.filter1.toJSON(),
            filter2: this.filter2.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new Filter({
            filter1: types.FilterType.fromJSON(obj.filter1),
            filter2: types.FilterType.fromJSON(obj.filter2),
        });
    }
    toEncodable() {
        return Filter.toEncodable(this);
    }
}
exports.Filter = Filter;
//# sourceMappingURL=Filter.js.map