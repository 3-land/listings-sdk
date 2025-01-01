import * as borsh from "@coral-xyz/borsh";
export class AllMints {
    constructor() {
        this.discriminator = 0;
        this.kind = "AllMints";
    }
    toJSON() {
        return {
            kind: "AllMints",
        };
    }
    toEncodable() {
        return {
            AllMints: {},
        };
    }
}
AllMints.discriminator = 0;
AllMints.kind = "AllMints";
export class PricedMintsOnly {
    constructor() {
        this.discriminator = 1;
        this.kind = "PricedMintsOnly";
    }
    toJSON() {
        return {
            kind: "PricedMintsOnly",
        };
    }
    toEncodable() {
        return {
            PricedMintsOnly: {},
        };
    }
}
PricedMintsOnly.discriminator = 1;
PricedMintsOnly.kind = "PricedMintsOnly";
export class SkipBurnMints {
    constructor() {
        this.discriminator = 2;
        this.kind = "SkipBurnMints";
    }
    toJSON() {
        return {
            kind: "SkipBurnMints",
        };
    }
    toEncodable() {
        return {
            SkipBurnMints: {},
        };
    }
}
SkipBurnMints.discriminator = 2;
SkipBurnMints.kind = "SkipBurnMints";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("AllMints" in obj) {
        return new AllMints();
    }
    if ("PricedMintsOnly" in obj) {
        return new PricedMintsOnly();
    }
    if ("SkipBurnMints" in obj) {
        return new SkipBurnMints();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "AllMints": {
            return new AllMints();
        }
        case "PricedMintsOnly": {
            return new PricedMintsOnly();
        }
        case "SkipBurnMints": {
            return new SkipBurnMints();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "AllMints"),
        borsh.struct([], "PricedMintsOnly"),
        borsh.struct([], "SkipBurnMints"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
