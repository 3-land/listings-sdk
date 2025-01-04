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
exports.FakeBurnCount = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class FakeBurnCount {
    constructor(fields) {
        this.key = fields.key;
        this.track = new types.DepositTrack({ ...fields.track });
    }
    static layout(property) {
        return borsh.struct([borsh.u64("key"), types.DepositTrack.layout("track")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new FakeBurnCount({
            key: obj.key,
            track: types.DepositTrack.fromDecoded(obj.track),
        });
    }
    static toEncodable(fields) {
        return {
            key: fields.key,
            track: types.DepositTrack.toEncodable(fields.track),
        };
    }
    toJSON() {
        return {
            key: this.key.toString(),
            track: this.track.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new FakeBurnCount({
            key: new bn_js_1.default(obj.key),
            track: types.DepositTrack.fromJSON(obj.track),
        });
    }
    toEncodable() {
        return FakeBurnCount.toEncodable(this);
    }
}
exports.FakeBurnCount = FakeBurnCount;
//# sourceMappingURL=FakeBurnCount.js.map