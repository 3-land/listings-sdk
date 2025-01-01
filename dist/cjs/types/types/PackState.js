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
exports.Unassigned = exports.Opened = exports.Closed = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Closed {
    constructor() {
        this.discriminator = 0;
        this.kind = "Closed";
    }
    toJSON() {
        return {
            kind: "Closed",
        };
    }
    toEncodable() {
        return {
            Closed: {},
        };
    }
}
exports.Closed = Closed;
Closed.discriminator = 0;
Closed.kind = "Closed";
class Opened {
    constructor() {
        this.discriminator = 1;
        this.kind = "Opened";
    }
    toJSON() {
        return {
            kind: "Opened",
        };
    }
    toEncodable() {
        return {
            Opened: {},
        };
    }
}
exports.Opened = Opened;
Opened.discriminator = 1;
Opened.kind = "Opened";
class Unassigned {
    constructor() {
        this.discriminator = 2;
        this.kind = "Unassigned";
    }
    toJSON() {
        return {
            kind: "Unassigned",
        };
    }
    toEncodable() {
        return {
            Unassigned: {},
        };
    }
}
exports.Unassigned = Unassigned;
Unassigned.discriminator = 2;
Unassigned.kind = "Unassigned";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Closed" in obj) {
        return new Closed();
    }
    if ("Opened" in obj) {
        return new Opened();
    }
    if ("Unassigned" in obj) {
        return new Unassigned();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Closed": {
            return new Closed();
        }
        case "Opened": {
            return new Opened();
        }
        case "Unassigned": {
            return new Unassigned();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Closed"),
        borsh.struct([], "Opened"),
        borsh.struct([], "Unassigned"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=PackState.js.map