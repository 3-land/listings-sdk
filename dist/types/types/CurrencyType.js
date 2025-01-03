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
exports.None = exports.Creator = exports.Collection = exports.Spl = exports.Native = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class Native {
    constructor() {
        this.discriminator = 0;
        this.kind = "Native";
    }
    toJSON() {
        return {
            kind: "Native",
        };
    }
    toEncodable() {
        return {
            Native: {},
        };
    }
}
exports.Native = Native;
Native.discriminator = 0;
Native.kind = "Native";
class Spl {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "Spl";
        this.value = {
            id: value.id,
        };
    }
    toJSON() {
        return {
            kind: "Spl",
            value: {
                id: this.value.id.toString(),
            },
        };
    }
    toEncodable() {
        return {
            Spl: {
                id: this.value.id,
            },
        };
    }
}
exports.Spl = Spl;
Spl.discriminator = 1;
Spl.kind = "Spl";
class Collection {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "Collection";
        this.value = {
            id: value.id,
        };
    }
    toJSON() {
        return {
            kind: "Collection",
            value: {
                id: this.value.id.toString(),
            },
        };
    }
    toEncodable() {
        return {
            Collection: {
                id: this.value.id,
            },
        };
    }
}
exports.Collection = Collection;
Collection.discriminator = 2;
Collection.kind = "Collection";
class Creator {
    constructor(value) {
        this.discriminator = 3;
        this.kind = "Creator";
        this.value = {
            id: value.id,
        };
    }
    toJSON() {
        return {
            kind: "Creator",
            value: {
                id: this.value.id.toString(),
            },
        };
    }
    toEncodable() {
        return {
            Creator: {
                id: this.value.id,
            },
        };
    }
}
exports.Creator = Creator;
Creator.discriminator = 3;
Creator.kind = "Creator";
class None {
    constructor() {
        this.discriminator = 4;
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
None.discriminator = 4;
None.kind = "None";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Native" in obj) {
        return new Native();
    }
    if ("Spl" in obj) {
        const val = obj["Spl"];
        return new Spl({
            id: val["id"],
        });
    }
    if ("Collection" in obj) {
        const val = obj["Collection"];
        return new Collection({
            id: val["id"],
        });
    }
    if ("Creator" in obj) {
        const val = obj["Creator"];
        return new Creator({
            id: val["id"],
        });
    }
    if ("None" in obj) {
        return new None();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Native": {
            return new Native();
        }
        case "Spl": {
            return new Spl({
                id: new web3_js_1.PublicKey(obj.value.id),
            });
        }
        case "Collection": {
            return new Collection({
                id: new web3_js_1.PublicKey(obj.value.id),
            });
        }
        case "Creator": {
            return new Creator({
                id: new web3_js_1.PublicKey(obj.value.id),
            });
        }
        case "None": {
            return new None();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Native"),
        borsh.struct([borsh.publicKey("id")], "Spl"),
        borsh.struct([borsh.publicKey("id")], "Collection"),
        borsh.struct([borsh.publicKey("id")], "Creator"),
        borsh.struct([], "None"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=CurrencyType.js.map