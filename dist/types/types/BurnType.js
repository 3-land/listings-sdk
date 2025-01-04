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
exports.Progressed = exports.InTX = exports.None = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class None {
    constructor() {
        this.discriminator = 0;
        this.kind = "None";
    }
    toJSON() {
        return {
            kind: "None",
        };
    }
    toEncodable() {
        return {
            None: {},
        };
    }
}
exports.None = None;
None.discriminator = 0;
None.kind = "None";
class InTX {
    constructor() {
        this.discriminator = 1;
        this.kind = "InTX";
    }
    toJSON() {
        return {
            kind: "InTX",
        };
    }
    toEncodable() {
        return {
            InTX: {},
        };
    }
}
exports.InTX = InTX;
InTX.discriminator = 1;
InTX.kind = "InTX";
class Progressed {
    constructor() {
        this.discriminator = 2;
        this.kind = "Progressed";
    }
    toJSON() {
        return {
            kind: "Progressed",
        };
    }
    toEncodable() {
        return {
            Progressed: {},
        };
    }
}
exports.Progressed = Progressed;
Progressed.discriminator = 2;
Progressed.kind = "Progressed";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("None" in obj) {
        return new None();
    }
    if ("InTX" in obj) {
        return new InTX();
    }
    if ("Progressed" in obj) {
        return new Progressed();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "None": {
            return new None();
        }
        case "InTX": {
            return new InTX();
        }
        case "Progressed": {
            return new Progressed();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "None"),
        borsh.struct([], "InTX"),
        borsh.struct([], "Progressed"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=BurnType.js.map