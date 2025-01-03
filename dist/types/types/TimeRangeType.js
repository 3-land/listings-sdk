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
exports.BetweenHoursNegate = exports.BetweenDays = exports.BetweenHours = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class BetweenHours {
    constructor() {
        this.discriminator = 0;
        this.kind = "BetweenHours";
    }
    toJSON() {
        return {
            kind: "BetweenHours",
        };
    }
    toEncodable() {
        return {
            BetweenHours: {},
        };
    }
}
exports.BetweenHours = BetweenHours;
BetweenHours.discriminator = 0;
BetweenHours.kind = "BetweenHours";
class BetweenDays {
    constructor() {
        this.discriminator = 1;
        this.kind = "BetweenDays";
    }
    toJSON() {
        return {
            kind: "BetweenDays",
        };
    }
    toEncodable() {
        return {
            BetweenDays: {},
        };
    }
}
exports.BetweenDays = BetweenDays;
BetweenDays.discriminator = 1;
BetweenDays.kind = "BetweenDays";
class BetweenHoursNegate {
    constructor() {
        this.discriminator = 2;
        this.kind = "BetweenHoursNegate";
    }
    toJSON() {
        return {
            kind: "BetweenHoursNegate",
        };
    }
    toEncodable() {
        return {
            BetweenHoursNegate: {},
        };
    }
}
exports.BetweenHoursNegate = BetweenHoursNegate;
BetweenHoursNegate.discriminator = 2;
BetweenHoursNegate.kind = "BetweenHoursNegate";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("BetweenHours" in obj) {
        return new BetweenHours();
    }
    if ("BetweenDays" in obj) {
        return new BetweenDays();
    }
    if ("BetweenHoursNegate" in obj) {
        return new BetweenHoursNegate();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "BetweenHours": {
            return new BetweenHours();
        }
        case "BetweenDays": {
            return new BetweenDays();
        }
        case "BetweenHoursNegate": {
            return new BetweenHoursNegate();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "BetweenHours"),
        borsh.struct([], "BetweenDays"),
        borsh.struct([], "BetweenHoursNegate"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=TimeRangeType.js.map