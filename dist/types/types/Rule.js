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
exports.WrappedDestiny = exports.WrappedSource = exports.UnwrapsAfter = exports.UnlocksAfter = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class UnlocksAfter {
    constructor(value) {
        this.discriminator = 0;
        this.kind = "UnlocksAfter";
        this.value = {
            rule: value.rule,
        };
    }
    toJSON() {
        return {
            kind: "UnlocksAfter",
            value: {
                rule: this.value.rule.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            UnlocksAfter: {
                rule: this.value.rule.toEncodable(),
            },
        };
    }
}
exports.UnlocksAfter = UnlocksAfter;
UnlocksAfter.discriminator = 0;
UnlocksAfter.kind = "UnlocksAfter";
class UnwrapsAfter {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "UnwrapsAfter";
        this.value = {
            rule: value.rule,
        };
    }
    toJSON() {
        return {
            kind: "UnwrapsAfter",
            value: {
                rule: this.value.rule.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            UnwrapsAfter: {
                rule: this.value.rule.toEncodable(),
            },
        };
    }
}
exports.UnwrapsAfter = UnwrapsAfter;
UnwrapsAfter.discriminator = 1;
UnwrapsAfter.kind = "UnwrapsAfter";
class WrappedSource {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "WrappedSource";
        this.value = {
            rule: new types.WrappedSource({ ...value.rule }),
        };
    }
    toJSON() {
        return {
            kind: "WrappedSource",
            value: {
                rule: this.value.rule.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            WrappedSource: {
                rule: types.WrappedSource.toEncodable(this.value.rule),
            },
        };
    }
}
exports.WrappedSource = WrappedSource;
WrappedSource.discriminator = 2;
WrappedSource.kind = "WrappedSource";
class WrappedDestiny {
    constructor(value) {
        this.discriminator = 3;
        this.kind = "WrappedDestiny";
        this.value = {
            rule: new types.WrappedDestiny({ ...value.rule }),
        };
    }
    toJSON() {
        return {
            kind: "WrappedDestiny",
            value: {
                rule: this.value.rule.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            WrappedDestiny: {
                rule: types.WrappedDestiny.toEncodable(this.value.rule),
            },
        };
    }
}
exports.WrappedDestiny = WrappedDestiny;
WrappedDestiny.discriminator = 3;
WrappedDestiny.kind = "WrappedDestiny";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("UnlocksAfter" in obj) {
        const val = obj["UnlocksAfter"];
        return new UnlocksAfter({
            rule: types.ActionAfter.fromDecoded(val["rule"]),
        });
    }
    if ("UnwrapsAfter" in obj) {
        const val = obj["UnwrapsAfter"];
        return new UnwrapsAfter({
            rule: types.ActionAfter.fromDecoded(val["rule"]),
        });
    }
    if ("WrappedSource" in obj) {
        const val = obj["WrappedSource"];
        return new WrappedSource({
            rule: types.WrappedSource.fromDecoded(val["rule"]),
        });
    }
    if ("WrappedDestiny" in obj) {
        const val = obj["WrappedDestiny"];
        return new WrappedDestiny({
            rule: types.WrappedDestiny.fromDecoded(val["rule"]),
        });
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "UnlocksAfter": {
            return new UnlocksAfter({
                rule: types.ActionAfter.fromJSON(obj.value.rule),
            });
        }
        case "UnwrapsAfter": {
            return new UnwrapsAfter({
                rule: types.ActionAfter.fromJSON(obj.value.rule),
            });
        }
        case "WrappedSource": {
            return new WrappedSource({
                rule: types.WrappedSource.fromJSON(obj.value.rule),
            });
        }
        case "WrappedDestiny": {
            return new WrappedDestiny({
                rule: types.WrappedDestiny.fromJSON(obj.value.rule),
            });
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([types.ActionAfter.layout("rule")], "UnlocksAfter"),
        borsh.struct([types.ActionAfter.layout("rule")], "UnwrapsAfter"),
        borsh.struct([types.WrappedSource.layout("rule")], "WrappedSource"),
        borsh.struct([types.WrappedDestiny.layout("rule")], "WrappedDestiny"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=Rule.js.map