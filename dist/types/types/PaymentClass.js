import * as borsh from "@coral-xyz/borsh";
export class PaymentV1 {
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
PaymentV1.discriminator = 0;
PaymentV1.kind = "PaymentV1";
export class BurnPaymentV1 {
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
BurnPaymentV1.discriminator = 1;
BurnPaymentV1.kind = "BurnPaymentV1";
export class GatePaymentV1 {
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
GatePaymentV1.discriminator = 2;
GatePaymentV1.kind = "GatePaymentV1";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
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
export function fromJSON(obj) {
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
export function layout(property) {
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
