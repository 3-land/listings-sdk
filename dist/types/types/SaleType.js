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
exports.NoMarketFee = exports.Normal = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Normal {
    constructor() {
        this.discriminator = 0;
        this.kind = "Normal";
    }
    toJSON() {
        return {
            kind: "Normal",
        };
    }
    toEncodable() {
        return {
            Normal: {},
        };
    }
}
exports.Normal = Normal;
Normal.discriminator = 0;
Normal.kind = "Normal";
class NoMarketFee {
    constructor() {
        this.discriminator = 1;
        this.kind = "NoMarketFee";
    }
    toJSON() {
        return {
            kind: "NoMarketFee",
        };
    }
    toEncodable() {
        return {
            NoMarketFee: {},
        };
    }
}
exports.NoMarketFee = NoMarketFee;
NoMarketFee.discriminator = 1;
NoMarketFee.kind = "NoMarketFee";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Normal" in obj) {
        return new Normal();
    }
    if ("NoMarketFee" in obj) {
        return new NoMarketFee();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Normal": {
            return new Normal();
        }
        case "NoMarketFee": {
            return new NoMarketFee();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Normal"),
        borsh.struct([], "NoMarketFee"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=SaleType.js.map