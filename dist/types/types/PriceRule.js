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
exports.BondingLinear = exports.Or = exports.And = exports.None = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
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
class And {
    constructor() {
        this.discriminator = 1;
        this.kind = "And";
    }
    toJSON() {
        return {
            kind: "And",
        };
    }
    toEncodable() {
        return {
            And: {},
        };
    }
}
exports.And = And;
And.discriminator = 1;
And.kind = "And";
class Or {
    constructor() {
        this.discriminator = 2;
        this.kind = "Or";
    }
    toJSON() {
        return {
            kind: "Or",
        };
    }
    toEncodable() {
        return {
            Or: {},
        };
    }
}
exports.Or = Or;
Or.discriminator = 2;
Or.kind = "Or";
class BondingLinear {
    constructor(value) {
        this.discriminator = 3;
        this.kind = "BondingLinear";
        this.value = {
            initial: value.initial,
            rate: value.rate,
            index: value.index,
            max: value.max,
            min: value.min,
        };
    }
    toJSON() {
        return {
            kind: "BondingLinear",
            value: {
                initial: this.value.initial.toString(),
                rate: this.value.rate.toString(),
                index: this.value.index,
                max: this.value.max,
                min: this.value.min,
            },
        };
    }
    toEncodable() {
        return {
            BondingLinear: {
                initial: this.value.initial,
                rate: this.value.rate,
                index: this.value.index,
                max: this.value.max,
                min: this.value.min,
            },
        };
    }
}
exports.BondingLinear = BondingLinear;
BondingLinear.discriminator = 3;
BondingLinear.kind = "BondingLinear";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("None" in obj) {
        return new None();
    }
    if ("And" in obj) {
        return new And();
    }
    if ("Or" in obj) {
        return new Or();
    }
    if ("BondingLinear" in obj) {
        const val = obj["BondingLinear"];
        return new BondingLinear({
            initial: val["initial"],
            rate: val["rate"],
            index: val["index"],
            max: val["max"],
            min: val["min"],
        });
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "None": {
            return new None();
        }
        case "And": {
            return new And();
        }
        case "Or": {
            return new Or();
        }
        case "BondingLinear": {
            return new BondingLinear({
                initial: new bn_js_1.default(obj.value.initial),
                rate: new bn_js_1.default(obj.value.rate),
                index: obj.value.index,
                max: obj.value.max,
                min: obj.value.min,
            });
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "None"),
        borsh.struct([], "And"),
        borsh.struct([], "Or"),
        borsh.struct([
            borsh.u64("initial"),
            borsh.u64("rate"),
            borsh.u8("index"),
            borsh.u32("max"),
            borsh.u16("min"),
        ], "BondingLinear"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=PriceRule.js.map