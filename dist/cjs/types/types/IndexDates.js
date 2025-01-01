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
exports.IndexDates = void 0;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class IndexDates {
    constructor(fields) {
        this.created = new types.IndexDate({ ...fields.created });
        this.activity = new types.IndexDate({ ...fields.activity });
    }
    static layout(property) {
        return borsh.struct([types.IndexDate.layout("created"), types.IndexDate.layout("activity")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new IndexDates({
            created: types.IndexDate.fromDecoded(obj.created),
            activity: types.IndexDate.fromDecoded(obj.activity),
        });
    }
    static toEncodable(fields) {
        return {
            created: types.IndexDate.toEncodable(fields.created),
            activity: types.IndexDate.toEncodable(fields.activity),
        };
    }
    toJSON() {
        return {
            created: this.created.toJSON(),
            activity: this.activity.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new IndexDates({
            created: types.IndexDate.fromJSON(obj.created),
            activity: types.IndexDate.fromJSON(obj.activity),
        });
    }
    toEncodable() {
        return IndexDates.toEncodable(this);
    }
}
exports.IndexDates = IndexDates;
//# sourceMappingURL=IndexDates.js.map