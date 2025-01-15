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
exports.WaitingGlobalApproval = exports.FlaggedPirate = exports.HiddenByUser = exports.Public = exports.HiddenBySystem = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class HiddenBySystem {
    constructor() {
        this.discriminator = 0;
        this.kind = "HiddenBySystem";
    }
    toJSON() {
        return {
            kind: "HiddenBySystem",
        };
    }
    toEncodable() {
        return {
            HiddenBySystem: {},
        };
    }
}
exports.HiddenBySystem = HiddenBySystem;
HiddenBySystem.discriminator = 0;
HiddenBySystem.kind = "HiddenBySystem";
class Public {
    constructor() {
        this.discriminator = 1;
        this.kind = "Public";
    }
    toJSON() {
        return {
            kind: "Public",
        };
    }
    toEncodable() {
        return {
            Public: {},
        };
    }
}
exports.Public = Public;
Public.discriminator = 1;
Public.kind = "Public";
class HiddenByUser {
    constructor() {
        this.discriminator = 2;
        this.kind = "HiddenByUser";
    }
    toJSON() {
        return {
            kind: "HiddenByUser",
        };
    }
    toEncodable() {
        return {
            HiddenByUser: {},
        };
    }
}
exports.HiddenByUser = HiddenByUser;
HiddenByUser.discriminator = 2;
HiddenByUser.kind = "HiddenByUser";
class FlaggedPirate {
    constructor() {
        this.discriminator = 3;
        this.kind = "FlaggedPirate";
    }
    toJSON() {
        return {
            kind: "FlaggedPirate",
        };
    }
    toEncodable() {
        return {
            FlaggedPirate: {},
        };
    }
}
exports.FlaggedPirate = FlaggedPirate;
FlaggedPirate.discriminator = 3;
FlaggedPirate.kind = "FlaggedPirate";
class WaitingGlobalApproval {
    constructor() {
        this.discriminator = 4;
        this.kind = "WaitingGlobalApproval";
    }
    toJSON() {
        return {
            kind: "WaitingGlobalApproval",
        };
    }
    toEncodable() {
        return {
            WaitingGlobalApproval: {},
        };
    }
}
exports.WaitingGlobalApproval = WaitingGlobalApproval;
WaitingGlobalApproval.discriminator = 4;
WaitingGlobalApproval.kind = "WaitingGlobalApproval";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("HiddenBySystem" in obj) {
        return new HiddenBySystem();
    }
    if ("Public" in obj) {
        return new Public();
    }
    if ("HiddenByUser" in obj) {
        return new HiddenByUser();
    }
    if ("FlaggedPirate" in obj) {
        return new FlaggedPirate();
    }
    if ("WaitingGlobalApproval" in obj) {
        return new WaitingGlobalApproval();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "HiddenBySystem": {
            return new HiddenBySystem();
        }
        case "Public": {
            return new Public();
        }
        case "HiddenByUser": {
            return new HiddenByUser();
        }
        case "FlaggedPirate": {
            return new FlaggedPirate();
        }
        case "WaitingGlobalApproval": {
            return new WaitingGlobalApproval();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "HiddenBySystem"),
        borsh.struct([], "Public"),
        borsh.struct([], "HiddenByUser"),
        borsh.struct([], "FlaggedPirate"),
        borsh.struct([], "WaitingGlobalApproval"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=GlobalState.js.map