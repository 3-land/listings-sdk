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
exports.NonFungible = exports.Date = exports.SemiFungible = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class SemiFungible {
    constructor(value) {
        this.discriminator = 0;
        this.kind = "SemiFungible";
        this.value = {
            typeId: value.typeId,
            amount: value.amount,
        };
    }
    toJSON() {
        return {
            kind: "SemiFungible",
            value: {
                typeId: this.value.typeId,
                amount: this.value.amount.toString(),
            },
        };
    }
    toEncodable() {
        return {
            SemiFungible: {
                typeId: this.value.typeId,
                amount: this.value.amount,
            },
        };
    }
}
exports.SemiFungible = SemiFungible;
SemiFungible.discriminator = 0;
SemiFungible.kind = "SemiFungible";
class Date {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "Date";
        this.value = {
            typeId: value.typeId,
            date: value.date,
        };
    }
    toJSON() {
        return {
            kind: "Date",
            value: {
                typeId: this.value.typeId,
                date: this.value.date,
            },
        };
    }
    toEncodable() {
        return {
            Date: {
                typeId: this.value.typeId,
                date: this.value.date,
            },
        };
    }
}
exports.Date = Date;
Date.discriminator = 1;
Date.kind = "Date";
class NonFungible {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "NonFungible";
        this.value = {
            typeId: value.typeId,
            valueId: value.valueId,
        };
    }
    toJSON() {
        return {
            kind: "NonFungible",
            value: {
                typeId: this.value.typeId,
                valueId: this.value.valueId,
            },
        };
    }
    toEncodable() {
        return {
            NonFungible: {
                typeId: this.value.typeId,
                valueId: this.value.valueId,
            },
        };
    }
}
exports.NonFungible = NonFungible;
NonFungible.discriminator = 2;
NonFungible.kind = "NonFungible";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("SemiFungible" in obj) {
        const val = obj["SemiFungible"];
        return new SemiFungible({
            typeId: val["typeId"],
            amount: val["amount"],
        });
    }
    if ("Date" in obj) {
        const val = obj["Date"];
        return new Date({
            typeId: val["typeId"],
            date: val["date"],
        });
    }
    if ("NonFungible" in obj) {
        const val = obj["NonFungible"];
        return new NonFungible({
            typeId: val["typeId"],
            valueId: val["valueId"],
        });
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "SemiFungible": {
            return new SemiFungible({
                typeId: obj.value.typeId,
                amount: new bn_js_1.default(obj.value.amount),
            });
        }
        case "Date": {
            return new Date({
                typeId: obj.value.typeId,
                date: obj.value.date,
            });
        }
        case "NonFungible": {
            return new NonFungible({
                typeId: obj.value.typeId,
                valueId: obj.value.valueId,
            });
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([borsh.u16("typeId"), borsh.u64("amount")], "SemiFungible"),
        borsh.struct([borsh.u16("typeId"), borsh.u32("date")], "Date"),
        borsh.struct([borsh.u16("typeId"), borsh.u16("valueId")], "NonFungible"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=TraitPassType.js.map