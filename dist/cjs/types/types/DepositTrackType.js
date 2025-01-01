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
exports.Collection = exports.PdaCreator = exports.Creator = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Creator {
    constructor() {
        this.discriminator = 0;
        this.kind = "Creator";
    }
    toJSON() {
        return {
            kind: "Creator",
        };
    }
    toEncodable() {
        return {
            Creator: {},
        };
    }
}
exports.Creator = Creator;
Creator.discriminator = 0;
Creator.kind = "Creator";
class PdaCreator {
    constructor() {
        this.discriminator = 1;
        this.kind = "PdaCreator";
    }
    toJSON() {
        return {
            kind: "PdaCreator",
        };
    }
    toEncodable() {
        return {
            PdaCreator: {},
        };
    }
}
exports.PdaCreator = PdaCreator;
PdaCreator.discriminator = 1;
PdaCreator.kind = "PdaCreator";
class Collection {
    constructor() {
        this.discriminator = 2;
        this.kind = "Collection";
    }
    toJSON() {
        return {
            kind: "Collection",
        };
    }
    toEncodable() {
        return {
            Collection: {},
        };
    }
}
exports.Collection = Collection;
Collection.discriminator = 2;
Collection.kind = "Collection";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Creator" in obj) {
        return new Creator();
    }
    if ("PdaCreator" in obj) {
        return new PdaCreator();
    }
    if ("Collection" in obj) {
        return new Collection();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Creator": {
            return new Creator();
        }
        case "PdaCreator": {
            return new PdaCreator();
        }
        case "Collection": {
            return new Collection();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Creator"),
        borsh.struct([], "PdaCreator"),
        borsh.struct([], "Collection"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
