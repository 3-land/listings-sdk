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
exports.RecoverDeposit = void 0;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RecoverDeposit {
    constructor(fields) {
        this.cnft = (fields.cnft && new types.CnftData({ ...fields.cnft })) || null;
    }
    static layout(property) {
        return borsh.struct([borsh.option(types.CnftData.layout(), "cnft")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RecoverDeposit({
            cnft: (obj.cnft && types.CnftData.fromDecoded(obj.cnft)) || null,
        });
    }
    static toEncodable(fields) {
        return {
            cnft: (fields.cnft && types.CnftData.toEncodable(fields.cnft)) || null,
        };
    }
    toJSON() {
        return {
            cnft: (this.cnft && this.cnft.toJSON()) || null,
        };
    }
    static fromJSON(obj) {
        return new RecoverDeposit({
            cnft: (obj.cnft && types.CnftData.fromJSON(obj.cnft)) || null,
        });
    }
    toEncodable() {
        return RecoverDeposit.toEncodable(this);
    }
}
exports.RecoverDeposit = RecoverDeposit;
//# sourceMappingURL=RecoverDeposit.js.map