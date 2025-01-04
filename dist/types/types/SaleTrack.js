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
exports.SaleTrack = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class SaleTrack {
    constructor(fields) {
        this.created = fields.created;
        this.sold = fields.sold;
        this.earned = fields.earned;
        this.collectors = fields.collectors;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("created"),
            borsh.u64("sold"),
            borsh.u64("earned"),
            borsh.u64("collectors"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SaleTrack({
            created: obj.created,
            sold: obj.sold,
            earned: obj.earned,
            collectors: obj.collectors,
        });
    }
    static toEncodable(fields) {
        return {
            created: fields.created,
            sold: fields.sold,
            earned: fields.earned,
            collectors: fields.collectors,
        };
    }
    toJSON() {
        return {
            created: this.created.toString(),
            sold: this.sold.toString(),
            earned: this.earned.toString(),
            collectors: this.collectors.toString(),
        };
    }
    static fromJSON(obj) {
        return new SaleTrack({
            created: new bn_js_1.default(obj.created),
            sold: new bn_js_1.default(obj.sold),
            earned: new bn_js_1.default(obj.earned),
            collectors: new bn_js_1.default(obj.collectors),
        });
    }
    toEncodable() {
        return SaleTrack.toEncodable(this);
    }
}
exports.SaleTrack = SaleTrack;
//# sourceMappingURL=SaleTrack.js.map