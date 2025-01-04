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
exports.SkipBurnMints = exports.PricedMintsOnly = exports.AllMints = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class AllMints {
    constructor() {
        this.discriminator = 0;
        this.kind = "AllMints";
    }
    toJSON() {
        return {
            kind: "AllMints",
        };
    }
    toEncodable() {
        return {
            AllMints: {},
        };
    }
}
exports.AllMints = AllMints;
AllMints.discriminator = 0;
AllMints.kind = "AllMints";
class PricedMintsOnly {
    constructor() {
        this.discriminator = 1;
        this.kind = "PricedMintsOnly";
    }
    toJSON() {
        return {
            kind: "PricedMintsOnly",
        };
    }
    toEncodable() {
        return {
            PricedMintsOnly: {},
        };
    }
}
exports.PricedMintsOnly = PricedMintsOnly;
PricedMintsOnly.discriminator = 1;
PricedMintsOnly.kind = "PricedMintsOnly";
class SkipBurnMints {
    constructor() {
        this.discriminator = 2;
        this.kind = "SkipBurnMints";
    }
    toJSON() {
        return {
            kind: "SkipBurnMints",
        };
    }
    toEncodable() {
        return {
            SkipBurnMints: {},
        };
    }
}
exports.SkipBurnMints = SkipBurnMints;
SkipBurnMints.discriminator = 2;
SkipBurnMints.kind = "SkipBurnMints";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("AllMints" in obj) {
        return new AllMints();
    }
    if ("PricedMintsOnly" in obj) {
        return new PricedMintsOnly();
    }
    if ("SkipBurnMints" in obj) {
        return new SkipBurnMints();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "AllMints": {
            return new AllMints();
        }
        case "PricedMintsOnly": {
            return new PricedMintsOnly();
        }
        case "SkipBurnMints": {
            return new SkipBurnMints();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "AllMints"),
        borsh.struct([], "PricedMintsOnly"),
        borsh.struct([], "SkipBurnMints"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=FeeType.js.map