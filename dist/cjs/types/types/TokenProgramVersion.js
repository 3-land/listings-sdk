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
exports.Token2022 = exports.Original = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Original {
    constructor() {
        this.discriminator = 0;
        this.kind = "Original";
    }
    toJSON() {
        return {
            kind: "Original",
        };
    }
    toEncodable() {
        return {
            Original: {},
        };
    }
}
exports.Original = Original;
Original.discriminator = 0;
Original.kind = "Original";
class Token2022 {
    constructor() {
        this.discriminator = 1;
        this.kind = "Token2022";
    }
    toJSON() {
        return {
            kind: "Token2022",
        };
    }
    toEncodable() {
        return {
            Token2022: {},
        };
    }
}
exports.Token2022 = Token2022;
Token2022.discriminator = 1;
Token2022.kind = "Token2022";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Original" in obj) {
        return new Original();
    }
    if ("Token2022" in obj) {
        return new Token2022();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Original": {
            return new Original();
        }
        case "Token2022": {
            return new Token2022();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Original"),
        borsh.struct([], "Token2022"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=TokenProgramVersion.js.map