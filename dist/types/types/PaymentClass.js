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
exports.GatePaymentV1 = exports.BurnPaymentV1 = exports.PaymentV1 = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class PaymentV1 {
    constructor() {
        this.discriminator = 0;
        this.kind = "PaymentV1";
    }
    toJSON() {
        return {
            kind: "PaymentV1",
        };
    }
    toEncodable() {
        return {
            PaymentV1: {},
        };
    }
}
exports.PaymentV1 = PaymentV1;
PaymentV1.discriminator = 0;
PaymentV1.kind = "PaymentV1";
class BurnPaymentV1 {
    constructor() {
        this.discriminator = 1;
        this.kind = "BurnPaymentV1";
    }
    toJSON() {
        return {
            kind: "BurnPaymentV1",
        };
    }
    toEncodable() {
        return {
            BurnPaymentV1: {},
        };
    }
}
exports.BurnPaymentV1 = BurnPaymentV1;
BurnPaymentV1.discriminator = 1;
BurnPaymentV1.kind = "BurnPaymentV1";
class GatePaymentV1 {
    constructor() {
        this.discriminator = 2;
        this.kind = "GatePaymentV1";
    }
    toJSON() {
        return {
            kind: "GatePaymentV1",
        };
    }
    toEncodable() {
        return {
            GatePaymentV1: {},
        };
    }
}
exports.GatePaymentV1 = GatePaymentV1;
GatePaymentV1.discriminator = 2;
GatePaymentV1.kind = "GatePaymentV1";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("PaymentV1" in obj) {
        return new PaymentV1();
    }
    if ("BurnPaymentV1" in obj) {
        return new BurnPaymentV1();
    }
    if ("GatePaymentV1" in obj) {
        return new GatePaymentV1();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "PaymentV1": {
            return new PaymentV1();
        }
        case "BurnPaymentV1": {
            return new BurnPaymentV1();
        }
        case "GatePaymentV1": {
            return new GatePaymentV1();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "PaymentV1"),
        borsh.struct([], "BurnPaymentV1"),
        borsh.struct([], "GatePaymentV1"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=PaymentClass.js.map