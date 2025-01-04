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
exports.NonFungibleEdition = exports.Fungible = exports.FungibleAsset = exports.NonFungible = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class NonFungible {
    constructor() {
        this.discriminator = 0;
        this.kind = "NonFungible";
    }
    toJSON() {
        return {
            kind: "NonFungible",
        };
    }
    toEncodable() {
        return {
            NonFungible: {},
        };
    }
}
exports.NonFungible = NonFungible;
NonFungible.discriminator = 0;
NonFungible.kind = "NonFungible";
class FungibleAsset {
    constructor() {
        this.discriminator = 1;
        this.kind = "FungibleAsset";
    }
    toJSON() {
        return {
            kind: "FungibleAsset",
        };
    }
    toEncodable() {
        return {
            FungibleAsset: {},
        };
    }
}
exports.FungibleAsset = FungibleAsset;
FungibleAsset.discriminator = 1;
FungibleAsset.kind = "FungibleAsset";
class Fungible {
    constructor() {
        this.discriminator = 2;
        this.kind = "Fungible";
    }
    toJSON() {
        return {
            kind: "Fungible",
        };
    }
    toEncodable() {
        return {
            Fungible: {},
        };
    }
}
exports.Fungible = Fungible;
Fungible.discriminator = 2;
Fungible.kind = "Fungible";
class NonFungibleEdition {
    constructor() {
        this.discriminator = 3;
        this.kind = "NonFungibleEdition";
    }
    toJSON() {
        return {
            kind: "NonFungibleEdition",
        };
    }
    toEncodable() {
        return {
            NonFungibleEdition: {},
        };
    }
}
exports.NonFungibleEdition = NonFungibleEdition;
NonFungibleEdition.discriminator = 3;
NonFungibleEdition.kind = "NonFungibleEdition";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("NonFungible" in obj) {
        return new NonFungible();
    }
    if ("FungibleAsset" in obj) {
        return new FungibleAsset();
    }
    if ("Fungible" in obj) {
        return new Fungible();
    }
    if ("NonFungibleEdition" in obj) {
        return new NonFungibleEdition();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "NonFungible": {
            return new NonFungible();
        }
        case "FungibleAsset": {
            return new FungibleAsset();
        }
        case "Fungible": {
            return new Fungible();
        }
        case "NonFungibleEdition": {
            return new NonFungibleEdition();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "NonFungible"),
        borsh.struct([], "FungibleAsset"),
        borsh.struct([], "Fungible"),
        borsh.struct([], "NonFungibleEdition"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=TokenStandard.js.map