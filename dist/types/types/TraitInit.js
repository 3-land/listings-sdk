import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class SemiFungible {
    constructor(value) {
        this.discriminator = 0;
        this.kind = "SemiFungible";
        this.value = {
            hash: value.hash,
        };
    }
    toJSON() {
        return {
            kind: "SemiFungible",
            value: {
                hash: this.value.hash.toString(),
            },
        };
    }
    toEncodable() {
        return {
            SemiFungible: {
                hash: this.value.hash,
            },
        };
    }
}
SemiFungible.discriminator = 0;
SemiFungible.kind = "SemiFungible";
export class Date {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "Date";
        this.value = {
            hash: value.hash,
        };
    }
    toJSON() {
        return {
            kind: "Date",
            value: {
                hash: this.value.hash.toString(),
            },
        };
    }
    toEncodable() {
        return {
            Date: {
                hash: this.value.hash,
            },
        };
    }
}
Date.discriminator = 1;
Date.kind = "Date";
export class NonFungible {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "NonFungible";
        this.value = {
            hash: value.hash,
            values: value.values,
        };
    }
    toJSON() {
        return {
            kind: "NonFungible",
            value: {
                hash: this.value.hash.toString(),
                values: this.value.values.map((item) => item.toString()),
            },
        };
    }
    toEncodable() {
        return {
            NonFungible: {
                hash: this.value.hash,
                values: this.value.values,
            },
        };
    }
}
NonFungible.discriminator = 2;
NonFungible.kind = "NonFungible";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("SemiFungible" in obj) {
        const val = obj["SemiFungible"];
        return new SemiFungible({
            hash: val["hash"],
        });
    }
    if ("Date" in obj) {
        const val = obj["Date"];
        return new Date({
            hash: val["hash"],
        });
    }
    if ("NonFungible" in obj) {
        const val = obj["NonFungible"];
        return new NonFungible({
            hash: val["hash"],
            values: val["values"],
        });
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "SemiFungible": {
            return new SemiFungible({
                hash: new BN(obj.value.hash),
            });
        }
        case "Date": {
            return new Date({
                hash: new BN(obj.value.hash),
            });
        }
        case "NonFungible": {
            return new NonFungible({
                hash: new BN(obj.value.hash),
                values: obj.value.values.map((item) => new BN(item)),
            });
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([borsh.u64("hash")], "SemiFungible"),
        borsh.struct([borsh.u64("hash")], "Date"),
        borsh.struct([borsh.u64("hash"), borsh.vec(borsh.u64(), "values")], "NonFungible"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
