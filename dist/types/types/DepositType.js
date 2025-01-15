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
exports.PdaCreator = exports.Creator = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class Creator {
    constructor(value) {
        this.discriminator = 0;
        this.kind = "Creator";
        this.value = {
            creators: value.creators.map((item) => new types.Creator({ ...item })),
        };
    }
    toJSON() {
        return {
            kind: "Creator",
            value: {
                creators: this.value.creators.map((item) => item.toJSON()),
            },
        };
    }
    toEncodable() {
        return {
            Creator: {
                creators: this.value.creators.map((item) => types.Creator.toEncodable(item)),
            },
        };
    }
}
exports.Creator = Creator;
Creator.discriminator = 0;
Creator.kind = "Creator";
class PdaCreator {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "PdaCreator";
        this.value = {
            creators: value.creators.map((item) => new types.Creator({ ...item })),
            hasher: new types.AccountHasher({ ...value.hasher }),
        };
    }
    toJSON() {
        return {
            kind: "PdaCreator",
            value: {
                creators: this.value.creators.map((item) => item.toJSON()),
                hasher: this.value.hasher.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            PdaCreator: {
                creators: this.value.creators.map((item) => types.Creator.toEncodable(item)),
                hasher: types.AccountHasher.toEncodable(this.value.hasher),
            },
        };
    }
}
exports.PdaCreator = PdaCreator;
PdaCreator.discriminator = 1;
PdaCreator.kind = "PdaCreator";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Creator" in obj) {
        const val = obj["Creator"];
        return new Creator({
            creators: val["creators"].map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.Creator.fromDecoded(item)),
        });
    }
    if ("PdaCreator" in obj) {
        const val = obj["PdaCreator"];
        return new PdaCreator({
            creators: val["creators"].map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.Creator.fromDecoded(item)),
            hasher: types.AccountHasher.fromDecoded(val["hasher"]),
        });
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Creator": {
            return new Creator({
                creators: obj.value.creators.map((item) => types.Creator.fromJSON(item)),
            });
        }
        case "PdaCreator": {
            return new PdaCreator({
                creators: obj.value.creators.map((item) => types.Creator.fromJSON(item)),
                hasher: types.AccountHasher.fromJSON(obj.value.hasher),
            });
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([borsh.vec(types.Creator.layout(), "creators")], "Creator"),
        borsh.struct([
            borsh.vec(types.Creator.layout(), "creators"),
            types.AccountHasher.layout("hasher"),
        ], "PdaCreator"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=DepositType.js.map