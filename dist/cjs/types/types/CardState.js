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
exports.NotReady = exports.None = exports.SoldOut = exports.Retired = exports.Inactive = exports.Hidden = exports.Active = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Active {
    constructor() {
        this.discriminator = 0;
        this.kind = "Active";
    }
    toJSON() {
        return {
            kind: "Active",
        };
    }
    toEncodable() {
        return {
            Active: {},
        };
    }
}
exports.Active = Active;
Active.discriminator = 0;
Active.kind = "Active";
class Hidden {
    constructor() {
        this.discriminator = 1;
        this.kind = "Hidden";
    }
    toJSON() {
        return {
            kind: "Hidden",
        };
    }
    toEncodable() {
        return {
            Hidden: {},
        };
    }
}
exports.Hidden = Hidden;
Hidden.discriminator = 1;
Hidden.kind = "Hidden";
class Inactive {
    constructor() {
        this.discriminator = 2;
        this.kind = "Inactive";
    }
    toJSON() {
        return {
            kind: "Inactive",
        };
    }
    toEncodable() {
        return {
            Inactive: {},
        };
    }
}
exports.Inactive = Inactive;
Inactive.discriminator = 2;
Inactive.kind = "Inactive";
class Retired {
    constructor() {
        this.discriminator = 3;
        this.kind = "Retired";
    }
    toJSON() {
        return {
            kind: "Retired",
        };
    }
    toEncodable() {
        return {
            Retired: {},
        };
    }
}
exports.Retired = Retired;
Retired.discriminator = 3;
Retired.kind = "Retired";
class SoldOut {
    constructor() {
        this.discriminator = 4;
        this.kind = "SoldOut";
    }
    toJSON() {
        return {
            kind: "SoldOut",
        };
    }
    toEncodable() {
        return {
            SoldOut: {},
        };
    }
}
exports.SoldOut = SoldOut;
SoldOut.discriminator = 4;
SoldOut.kind = "SoldOut";
class None {
    constructor() {
        this.discriminator = 5;
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
None.discriminator = 5;
None.kind = "None";
class NotReady {
    constructor() {
        this.discriminator = 6;
        this.kind = "NotReady";
    }
    toJSON() {
        return {
            kind: "NotReady",
        };
    }
    toEncodable() {
        return {
            NotReady: {},
        };
    }
}
exports.NotReady = NotReady;
NotReady.discriminator = 6;
NotReady.kind = "NotReady";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Active" in obj) {
        return new Active();
    }
    if ("Hidden" in obj) {
        return new Hidden();
    }
    if ("Inactive" in obj) {
        return new Inactive();
    }
    if ("Retired" in obj) {
        return new Retired();
    }
    if ("SoldOut" in obj) {
        return new SoldOut();
    }
    if ("None" in obj) {
        return new None();
    }
    if ("NotReady" in obj) {
        return new NotReady();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "Active": {
            return new Active();
        }
        case "Hidden": {
            return new Hidden();
        }
        case "Inactive": {
            return new Inactive();
        }
        case "Retired": {
            return new Retired();
        }
        case "SoldOut": {
            return new SoldOut();
        }
        case "None": {
            return new None();
        }
        case "NotReady": {
            return new NotReady();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Active"),
        borsh.struct([], "Hidden"),
        borsh.struct([], "Inactive"),
        borsh.struct([], "Retired"),
        borsh.struct([], "SoldOut"),
        borsh.struct([], "None"),
        borsh.struct([], "NotReady"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=CardState.js.map