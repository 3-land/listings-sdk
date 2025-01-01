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
exports.SellingOut = exports.Hours = exports.Supply = exports.MintingOut = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class MintingOut {
    constructor() {
        this.discriminator = 0;
        this.kind = "MintingOut";
    }
    toJSON() {
        return {
            kind: "MintingOut",
        };
    }
    toEncodable() {
        return {
            MintingOut: {},
        };
    }
}
exports.MintingOut = MintingOut;
MintingOut.discriminator = 0;
MintingOut.kind = "MintingOut";
class Supply {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "Supply";
        this.value = {
            limit: value.limit,
        };
    }
    toJSON() {
        return {
            kind: "Supply",
            value: {
                limit: this.value.limit,
            },
        };
    }
    toEncodable() {
        return {
            Supply: {
                limit: this.value.limit,
            },
        };
    }
}
exports.Supply = Supply;
Supply.discriminator = 1;
Supply.kind = "Supply";
class Hours {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "Hours";
        this.value = {
            hours: value.hours,
        };
    }
    toJSON() {
        return {
            kind: "Hours",
            value: {
                hours: this.value.hours,
            },
        };
    }
    toEncodable() {
        return {
            Hours: {
                hours: this.value.hours,
            },
        };
    }
}
exports.Hours = Hours;
Hours.discriminator = 2;
Hours.kind = "Hours";
class SellingOut {
    constructor() {
        this.discriminator = 3;
        this.kind = "SellingOut";
    }
    toJSON() {
        return {
            kind: "SellingOut",
        };
    }
    toEncodable() {
        return {
            SellingOut: {},
        };
    }
}
exports.SellingOut = SellingOut;
SellingOut.discriminator = 3;
SellingOut.kind = "SellingOut";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("MintingOut" in obj) {
        return new MintingOut();
    }
    if ("Supply" in obj) {
        const val = obj["Supply"];
        return new Supply({
            limit: val["limit"],
        });
    }
    if ("Hours" in obj) {
        const val = obj["Hours"];
        return new Hours({
            hours: val["hours"],
        });
    }
    if ("SellingOut" in obj) {
        return new SellingOut();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "MintingOut": {
            return new MintingOut();
        }
        case "Supply": {
            return new Supply({
                limit: obj.value.limit,
            });
        }
        case "Hours": {
            return new Hours({
                hours: obj.value.hours,
            });
        }
        case "SellingOut": {
            return new SellingOut();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "MintingOut"),
        borsh.struct([borsh.u32("limit")], "Supply"),
        borsh.struct([borsh.u16("hours")], "Hours"),
        borsh.struct([], "SellingOut"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=ActionAfter.js.map