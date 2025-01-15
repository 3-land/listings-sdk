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
exports.Data = exports.NonFungible = exports.Date = exports.SemiFungible = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class SemiFungible {
    constructor(value) {
        this.discriminator = 0;
        this.kind = "SemiFungible";
        this.value = {
            hash: value.hash,
            count: value.count,
            supply: value.supply,
            total: value.total,
        };
    }
    toJSON() {
        return {
            kind: "SemiFungible",
            value: {
                hash: this.value.hash.toString(),
                count: this.value.count,
                supply: this.value.supply.toString(),
                total: this.value.total.toString(),
            },
        };
    }
    toEncodable() {
        return {
            SemiFungible: {
                hash: this.value.hash,
                count: this.value.count,
                supply: this.value.supply,
                total: this.value.total,
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
            hash: value.hash,
            count: value.count,
            supply: value.supply,
        };
    }
    toJSON() {
        return {
            kind: "Date",
            value: {
                hash: this.value.hash.toString(),
                count: this.value.count,
                supply: this.value.supply.toString(),
            },
        };
    }
    toEncodable() {
        return {
            Date: {
                hash: this.value.hash,
                count: this.value.count,
                supply: this.value.supply,
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
            hash: value.hash,
            values: value.values.map((item) => new types.TraitValue({ ...item })),
        };
    }
    toJSON() {
        return {
            kind: "NonFungible",
            value: {
                hash: this.value.hash.toString(),
                values: this.value.values.map((item) => item.toJSON()),
            },
        };
    }
    toEncodable() {
        return {
            NonFungible: {
                hash: this.value.hash,
                values: this.value.values.map((item) => types.TraitValue.toEncodable(item)),
            },
        };
    }
}
exports.NonFungible = NonFungible;
NonFungible.discriminator = 2;
NonFungible.kind = "NonFungible";
class Data {
    constructor(value) {
        this.discriminator = 3;
        this.kind = "Data";
        this.value = {
            hash: value.hash,
            count: value.count,
            supply: value.supply,
        };
    }
    toJSON() {
        return {
            kind: "Data",
            value: {
                hash: this.value.hash.toString(),
                count: this.value.count,
                supply: this.value.supply.toString(),
            },
        };
    }
    toEncodable() {
        return {
            Data: {
                hash: this.value.hash,
                count: this.value.count,
                supply: this.value.supply,
            },
        };
    }
}
exports.Data = Data;
Data.discriminator = 3;
Data.kind = "Data";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("SemiFungible" in obj) {
        const val = obj["SemiFungible"];
        return new SemiFungible({
            hash: val["hash"],
            count: val["count"],
            supply: val["supply"],
            total: val["total"],
        });
    }
    if ("Date" in obj) {
        const val = obj["Date"];
        return new Date({
            hash: val["hash"],
            count: val["count"],
            supply: val["supply"],
        });
    }
    if ("NonFungible" in obj) {
        const val = obj["NonFungible"];
        return new NonFungible({
            hash: val["hash"],
            values: val["values"].map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.TraitValue.fromDecoded(item)),
        });
    }
    if ("Data" in obj) {
        const val = obj["Data"];
        return new Data({
            hash: val["hash"],
            count: val["count"],
            supply: val["supply"],
        });
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "SemiFungible": {
            return new SemiFungible({
                hash: new bn_js_1.default(obj.value.hash),
                count: obj.value.count,
                supply: new bn_js_1.default(obj.value.supply),
                total: new bn_js_1.default(obj.value.total),
            });
        }
        case "Date": {
            return new Date({
                hash: new bn_js_1.default(obj.value.hash),
                count: obj.value.count,
                supply: new bn_js_1.default(obj.value.supply),
            });
        }
        case "NonFungible": {
            return new NonFungible({
                hash: new bn_js_1.default(obj.value.hash),
                values: obj.value.values.map((item) => types.TraitValue.fromJSON(item)),
            });
        }
        case "Data": {
            return new Data({
                hash: new bn_js_1.default(obj.value.hash),
                count: obj.value.count,
                supply: new bn_js_1.default(obj.value.supply),
            });
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([
            borsh.u64("hash"),
            borsh.u32("count"),
            borsh.u64("supply"),
            borsh.u64("total"),
        ], "SemiFungible"),
        borsh.struct([borsh.u64("hash"), borsh.u32("count"), borsh.u64("supply")], "Date"),
        borsh.struct([borsh.u64("hash"), borsh.vec(types.TraitValue.layout(), "values")], "NonFungible"),
        borsh.struct([borsh.u64("hash"), borsh.u32("count"), borsh.u64("supply")], "Data"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=TraitType.js.map