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
exports.Nft = exports.Cnft = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Cnft {
    constructor() {
        this.discriminator = 0;
        this.kind = "Cnft";
    }
    toJSON() {
        return {
            kind: "Cnft",
        };
    }
    toEncodable() {
        return {
            Cnft: {},
        };
    }
}
exports.Cnft = Cnft;
Cnft.discriminator = 0;
Cnft.kind = "Cnft";
class Nft {
    constructor() {
        this.discriminator = 1;
        this.kind = "Nft";
    }
    toJSON() {
        return {
            kind: "Nft",
        };
    }
    toEncodable() {
        return {
            Nft: {},
        };
    }
}
exports.Nft = Nft;
Nft.discriminator = 1;
Nft.kind = "Nft";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Cnft" in obj) {
        return new Cnft();
    }
    if ("Nft" in obj) {
        return new Nft();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Cnft": {
            return new Cnft();
        }
        case "Nft": {
            return new Nft();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Cnft"),
        borsh.struct([], "Nft"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=DepositFormat.js.map