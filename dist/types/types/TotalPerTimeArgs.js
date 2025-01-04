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
exports.TotalPerTimeArgs = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class TotalPerTimeArgs {
    constructor(fields) {
        this.count = fields.count;
        this.amount = fields.amount;
        this.time = fields.time;
        this.lastTimeReset = fields.lastTimeReset;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u16("count"),
            borsh.u16("amount"),
            borsh.u32("time"),
            borsh.u32("lastTimeReset"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new TotalPerTimeArgs({
            count: obj.count,
            amount: obj.amount,
            time: obj.time,
            lastTimeReset: obj.lastTimeReset,
        });
    }
    static toEncodable(fields) {
        return {
            count: fields.count,
            amount: fields.amount,
            time: fields.time,
            lastTimeReset: fields.lastTimeReset,
        };
    }
    toJSON() {
        return {
            count: this.count,
            amount: this.amount,
            time: this.time,
            lastTimeReset: this.lastTimeReset,
        };
    }
    static fromJSON(obj) {
        return new TotalPerTimeArgs({
            count: obj.count,
            amount: obj.amount,
            time: obj.time,
            lastTimeReset: obj.lastTimeReset,
        });
    }
    toEncodable() {
        return TotalPerTimeArgs.toEncodable(this);
    }
}
exports.TotalPerTimeArgs = TotalPerTimeArgs;
//# sourceMappingURL=TotalPerTimeArgs.js.map