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
exports.Single = exports.Multiple = exports.Burn = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Burn {
    constructor() {
        this.discriminator = 0;
        this.kind = "Burn";
    }
    toJSON() {
        return {
            kind: "Burn",
        };
    }
    toEncodable() {
        return {
            Burn: {},
        };
    }
}
exports.Burn = Burn;
Burn.discriminator = 0;
Burn.kind = "Burn";
class Multiple {
    constructor() {
        this.discriminator = 1;
        this.kind = "Multiple";
    }
    toJSON() {
        return {
            kind: "Multiple",
        };
    }
    toEncodable() {
        return {
            Multiple: {},
        };
    }
}
exports.Multiple = Multiple;
Multiple.discriminator = 1;
Multiple.kind = "Multiple";
class Single {
    constructor() {
        this.discriminator = 2;
        this.kind = "Single";
    }
    toJSON() {
        return {
            kind: "Single",
        };
    }
    toEncodable() {
        return {
            Single: {},
        };
    }
}
exports.Single = Single;
Single.discriminator = 2;
Single.kind = "Single";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Burn" in obj) {
        return new Burn();
    }
    if ("Multiple" in obj) {
        return new Multiple();
    }
    if ("Single" in obj) {
        return new Single();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Burn": {
            return new Burn();
        }
        case "Multiple": {
            return new Multiple();
        }
        case "Single": {
            return new Single();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Burn"),
        borsh.struct([], "Multiple"),
        borsh.struct([], "Single"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=UseMethod.js.map