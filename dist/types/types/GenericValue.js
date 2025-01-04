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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EightBytes = exports.Key = exports.None = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
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
class Key {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "Key";
        this.value = {
            value: value.value,
        };
    }
    toJSON() {
        return {
            kind: "Key",
            value: {
                value: this.value.value.toString(),
            },
        };
    }
    toEncodable() {
        return {
            Key: {
                value: this.value.value,
            },
        };
    }
}
exports.Key = Key;
Key.discriminator = 1;
Key.kind = "Key";
class EightBytes {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "EightBytes";
        this.value = {
            value: value.value,
        };
    }
    toJSON() {
        return {
            kind: "EightBytes",
            value: {
                value: this.value.value.toString(),
            },
        };
    }
    toEncodable() {
        return {
            EightBytes: {
                value: this.value.value,
            },
        };
    }
}
exports.EightBytes = EightBytes;
EightBytes.discriminator = 2;
EightBytes.kind = "EightBytes";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("None" in obj) {
        return new None();
    }
    if ("Key" in obj) {
        const val = obj["Key"];
        return new Key({
            value: val["value"],
        });
    }
    if ("EightBytes" in obj) {
        const val = obj["EightBytes"];
        return new EightBytes({
            value: val["value"],
        });
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "None": {
            return new None();
        }
        case "Key": {
            return new Key({
                value: new web3_js_1.PublicKey(obj.value.value),
            });
        }
        case "EightBytes": {
            return new EightBytes({
                value: new bn_js_1.default(obj.value.value),
            });
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "None"),
        borsh.struct([borsh.publicKey("value")], "Key"),
        borsh.struct([borsh.u64("value")], "EightBytes"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=GenericValue.js.map