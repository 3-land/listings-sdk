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
exports.Claimed = exports.Claiming = exports.Unclaimed = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Unclaimed {
    constructor() {
        this.discriminator = 0;
        this.kind = "Unclaimed";
    }
    toJSON() {
        return {
            kind: "Unclaimed",
        };
    }
    toEncodable() {
        return {
            Unclaimed: {},
        };
    }
}
exports.Unclaimed = Unclaimed;
Unclaimed.discriminator = 0;
Unclaimed.kind = "Unclaimed";
class Claiming {
    constructor() {
        this.discriminator = 1;
        this.kind = "Claiming";
    }
    toJSON() {
        return {
            kind: "Claiming",
        };
    }
    toEncodable() {
        return {
            Claiming: {},
        };
    }
}
exports.Claiming = Claiming;
Claiming.discriminator = 1;
Claiming.kind = "Claiming";
class Claimed {
    constructor() {
        this.discriminator = 2;
        this.kind = "Claimed";
    }
    toJSON() {
        return {
            kind: "Claimed",
        };
    }
    toEncodable() {
        return {
            Claimed: {},
        };
    }
}
exports.Claimed = Claimed;
Claimed.discriminator = 2;
Claimed.kind = "Claimed";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Unclaimed" in obj) {
        return new Unclaimed();
    }
    if ("Claiming" in obj) {
        return new Claiming();
    }
    if ("Claimed" in obj) {
        return new Claimed();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Unclaimed": {
            return new Unclaimed();
        }
        case "Claiming": {
            return new Claiming();
        }
        case "Claimed": {
            return new Claimed();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Unclaimed"),
        borsh.struct([], "Claiming"),
        borsh.struct([], "Claimed"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=PackOpenHolderState.js.map