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
exports.IndexDate = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class IndexDate {
    constructor(fields) {
        this.hour = fields.hour;
        this.day = fields.day;
        this.week = fields.week;
        this.month = fields.month;
        this.minRelative = fields.minRelative;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u32("hour"),
            borsh.u32("day"),
            borsh.u32("week"),
            borsh.u32("month"),
            borsh.u8("minRelative"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new IndexDate({
            hour: obj.hour,
            day: obj.day,
            week: obj.week,
            month: obj.month,
            minRelative: obj.minRelative,
        });
    }
    static toEncodable(fields) {
        return {
            hour: fields.hour,
            day: fields.day,
            week: fields.week,
            month: fields.month,
            minRelative: fields.minRelative,
        };
    }
    toJSON() {
        return {
            hour: this.hour,
            day: this.day,
            week: this.week,
            month: this.month,
            minRelative: this.minRelative,
        };
    }
    static fromJSON(obj) {
        return new IndexDate({
            hour: obj.hour,
            day: obj.day,
            week: obj.week,
            month: obj.month,
            minRelative: obj.minRelative,
        });
    }
    toEncodable() {
        return IndexDate.toEncodable(this);
    }
}
exports.IndexDate = IndexDate;
//# sourceMappingURL=IndexDate.js.map