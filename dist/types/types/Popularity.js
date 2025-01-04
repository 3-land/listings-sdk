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
exports.Popularity = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class Popularity {
    constructor(fields) {
        this.lastReset = fields.lastReset;
        this.count = fields.count;
        this.state = fields.state;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u16("lastReset"),
            borsh.u64("count"),
            types.PopularityState.layout("state"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Popularity({
            lastReset: obj.lastReset,
            count: obj.count,
            state: types.PopularityState.fromDecoded(obj.state),
        });
    }
    static toEncodable(fields) {
        return {
            lastReset: fields.lastReset,
            count: fields.count,
            state: fields.state.toEncodable(),
        };
    }
    toJSON() {
        return {
            lastReset: this.lastReset,
            count: this.count.toString(),
            state: this.state.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new Popularity({
            lastReset: obj.lastReset,
            count: new bn_js_1.default(obj.count),
            state: types.PopularityState.fromJSON(obj.state),
        });
    }
    toEncodable() {
        return Popularity.toEncodable(this);
    }
}
exports.Popularity = Popularity;
//# sourceMappingURL=Popularity.js.map