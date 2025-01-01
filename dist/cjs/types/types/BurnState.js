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
exports.Pending = exports.NonPending = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class NonPending {
    constructor() {
        this.discriminator = 0;
        this.kind = "NonPending";
    }
    toJSON() {
        return {
            kind: "NonPending",
        };
    }
    toEncodable() {
        return {
            NonPending: {},
        };
    }
}
exports.NonPending = NonPending;
NonPending.discriminator = 0;
NonPending.kind = "NonPending";
class Pending {
    constructor() {
        this.discriminator = 1;
        this.kind = "Pending";
    }
    toJSON() {
        return {
            kind: "Pending",
        };
    }
    toEncodable() {
        return {
            Pending: {},
        };
    }
}
exports.Pending = Pending;
Pending.discriminator = 1;
Pending.kind = "Pending";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("NonPending" in obj) {
        return new NonPending();
    }
    if ("Pending" in obj) {
        return new Pending();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "NonPending": {
            return new NonPending();
        }
        case "Pending": {
            return new Pending();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "NonPending"),
        borsh.struct([], "Pending"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=BurnState.js.map