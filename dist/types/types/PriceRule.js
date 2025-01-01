import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class None {
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
None.discriminator = 0;
None.kind = "None";
export class And {
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
And.discriminator = 1;
And.kind = "And";
export class Or {
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
Or.discriminator = 2;
Or.kind = "Or";
export class BondingLinear {
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
BondingLinear.discriminator = 3;
BondingLinear.kind = "BondingLinear";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
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
export function fromJSON(obj) {
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
                initial: new BN(obj.value.initial),
                rate: new BN(obj.value.rate),
                index: obj.value.index,
                max: obj.value.max,
                min: obj.value.min,
            });
        }
    }
}
export function layout(property) {
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
