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
exports.Tracked = exports.NoTrack = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class NoTrack {
    constructor() {
        this.discriminator = 0;
        this.kind = "NoTrack";
    }
    toJSON() {
        return {
            kind: "NoTrack",
        };
    }
    toEncodable() {
        return {
            NoTrack: {},
        };
    }
}
exports.NoTrack = NoTrack;
NoTrack.discriminator = 0;
NoTrack.kind = "NoTrack";
class Tracked {
    constructor() {
        this.discriminator = 1;
        this.kind = "Tracked";
    }
    toJSON() {
        return {
            kind: "Tracked",
        };
    }
    toEncodable() {
        return {
            Tracked: {},
        };
    }
}
exports.Tracked = Tracked;
Tracked.discriminator = 1;
Tracked.kind = "Tracked";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("NoTrack" in obj) {
        return new NoTrack();
    }
    if ("Tracked" in obj) {
        return new Tracked();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "NoTrack": {
            return new NoTrack();
        }
        case "Tracked": {
            return new Tracked();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "NoTrack"),
        borsh.struct([], "Tracked"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=TrackRegistry.js.map