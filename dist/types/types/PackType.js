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
exports.Bundle = exports.RandomPack = exports.RandomDirect = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class RandomDirect {
    constructor() {
        this.discriminator = 0;
        this.kind = "RandomDirect";
    }
    toJSON() {
        return {
            kind: "RandomDirect",
        };
    }
    toEncodable() {
        return {
            RandomDirect: {},
        };
    }
}
exports.RandomDirect = RandomDirect;
RandomDirect.discriminator = 0;
RandomDirect.kind = "RandomDirect";
class RandomPack {
    constructor() {
        this.discriminator = 1;
        this.kind = "RandomPack";
    }
    toJSON() {
        return {
            kind: "RandomPack",
        };
    }
    toEncodable() {
        return {
            RandomPack: {},
        };
    }
}
exports.RandomPack = RandomPack;
RandomPack.discriminator = 1;
RandomPack.kind = "RandomPack";
class Bundle {
    constructor() {
        this.discriminator = 2;
        this.kind = "Bundle";
    }
    toJSON() {
        return {
            kind: "Bundle",
        };
    }
    toEncodable() {
        return {
            Bundle: {},
        };
    }
}
exports.Bundle = Bundle;
Bundle.discriminator = 2;
Bundle.kind = "Bundle";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("RandomDirect" in obj) {
        return new RandomDirect();
    }
    if ("RandomPack" in obj) {
        return new RandomPack();
    }
    if ("Bundle" in obj) {
        return new Bundle();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "RandomDirect": {
            return new RandomDirect();
        }
        case "RandomPack": {
            return new RandomPack();
        }
        case "Bundle": {
            return new Bundle();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "RandomDirect"),
        borsh.struct([], "RandomPack"),
        borsh.struct([], "Bundle"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=PackType.js.map