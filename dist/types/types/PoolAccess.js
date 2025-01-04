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
exports.Public = exports.Cpi = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Cpi {
    constructor() {
        this.discriminator = 0;
        this.kind = "Cpi";
    }
    toJSON() {
        return {
            kind: "Cpi",
        };
    }
    toEncodable() {
        return {
            Cpi: {},
        };
    }
}
exports.Cpi = Cpi;
Cpi.discriminator = 0;
Cpi.kind = "Cpi";
class Public {
    constructor() {
        this.discriminator = 1;
        this.kind = "Public";
    }
    toJSON() {
        return {
            kind: "Public",
        };
    }
    toEncodable() {
        return {
            Public: {},
        };
    }
}
exports.Public = Public;
Public.discriminator = 1;
Public.kind = "Public";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Cpi" in obj) {
        return new Cpi();
    }
    if ("Public" in obj) {
        return new Public();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Cpi": {
            return new Cpi();
        }
        case "Public": {
            return new Public();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Cpi"),
        borsh.struct([], "Public"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=PoolAccess.js.map