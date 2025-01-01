import { PublicKey } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
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
export class Key {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "Key";
        this.value = {
            value: value.value,
        };
    }
    toJSON() {
        return {
            kind: "Key",
            value: {
                value: this.value.value.toString(),
            },
        };
    }
    toEncodable() {
        return {
            Key: {
                value: this.value.value,
            },
        };
    }
}
Key.discriminator = 1;
Key.kind = "Key";
export class EightBytes {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "EightBytes";
        this.value = {
            value: value.value,
        };
    }
    toJSON() {
        return {
            kind: "EightBytes",
            value: {
                value: this.value.value.toString(),
            },
        };
    }
    toEncodable() {
        return {
            EightBytes: {
                value: this.value.value,
            },
        };
    }
}
EightBytes.discriminator = 2;
EightBytes.kind = "EightBytes";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("None" in obj) {
        return new None();
    }
    if ("Key" in obj) {
        const val = obj["Key"];
        return new Key({
            value: val["value"],
        });
    }
    if ("EightBytes" in obj) {
        const val = obj["EightBytes"];
        return new EightBytes({
            value: val["value"],
        });
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "None": {
            return new None();
        }
        case "Key": {
            return new Key({
                value: new PublicKey(obj.value.value),
            });
        }
        case "EightBytes": {
            return new EightBytes({
                value: new BN(obj.value.value),
            });
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "None"),
        borsh.struct([borsh.publicKey("value")], "Key"),
        borsh.struct([borsh.u64("value")], "EightBytes"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
