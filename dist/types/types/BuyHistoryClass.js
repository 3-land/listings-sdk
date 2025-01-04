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
exports.PackBuyV1 = exports.SingleBuyV1 = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class SingleBuyV1 {
    constructor() {
        this.discriminator = 0;
        this.kind = "SingleBuyV1";
    }
    toJSON() {
        return {
            kind: "SingleBuyV1",
        };
    }
    toEncodable() {
        return {
            SingleBuyV1: {},
        };
    }
}
exports.SingleBuyV1 = SingleBuyV1;
SingleBuyV1.discriminator = 0;
SingleBuyV1.kind = "SingleBuyV1";
class PackBuyV1 {
    constructor() {
        this.discriminator = 1;
        this.kind = "PackBuyV1";
    }
    toJSON() {
        return {
            kind: "PackBuyV1",
        };
    }
    toEncodable() {
        return {
            PackBuyV1: {},
        };
    }
}
exports.PackBuyV1 = PackBuyV1;
PackBuyV1.discriminator = 1;
PackBuyV1.kind = "PackBuyV1";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("SingleBuyV1" in obj) {
        return new SingleBuyV1();
    }
    if ("PackBuyV1" in obj) {
        return new PackBuyV1();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "SingleBuyV1": {
            return new SingleBuyV1();
        }
        case "PackBuyV1": {
            return new PackBuyV1();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "SingleBuyV1"),
        borsh.struct([], "PackBuyV1"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=BuyHistoryClass.js.map