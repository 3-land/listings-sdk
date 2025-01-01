import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class SemiFungible {
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
SemiFungible.discriminator = 0;
SemiFungible.kind = "SemiFungible";
export class Date {
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
Date.discriminator = 1;
Date.kind = "Date";
export class NonFungible {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "NonFungible";
        this.value = {
            hash: value.hash,
            values: value.values.map((item) => new types.TraitValue(Object.assign({}, item))),
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
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "SemiFungible": {
            return new SemiFungible({
                hash: new BN(obj.value.hash),
                count: obj.value.count,
                supply: new BN(obj.value.supply),
                total: new BN(obj.value.total),
            });
        }
        case "Date": {
            return new Date({
                hash: new BN(obj.value.hash),
                count: obj.value.count,
                supply: new BN(obj.value.supply),
            });
        }
        case "NonFungible": {
            return new NonFungible({
                hash: new BN(obj.value.hash),
                values: obj.value.values.map((item) => types.TraitValue.fromJSON(item)),
            });
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([
            borsh.u64("hash"),
            borsh.u32("count"),
            borsh.u64("supply"),
            borsh.u64("total"),
        ], "SemiFungible"),
        borsh.struct([borsh.u64("hash"), borsh.u32("count"), borsh.u64("supply")], "Date"),
        borsh.struct([borsh.u64("hash"), borsh.vec(types.TraitValue.layout(), "values")], "NonFungible"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
