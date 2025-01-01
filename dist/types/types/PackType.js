import * as borsh from "@coral-xyz/borsh";
export class RandomDirect {
    constructor() {
        this.discriminator = 0;
        this.kind = "RandomDirect";
    }
    toJSON() {
        return {
            kind: "RandomDirect",
        };
    }
    toEncodable() {
        return {
            RandomDirect: {},
        };
    }
}
RandomDirect.discriminator = 0;
RandomDirect.kind = "RandomDirect";
export class RandomPack {
    constructor() {
        this.discriminator = 1;
        this.kind = "RandomPack";
    }
    toJSON() {
        return {
            kind: "RandomPack",
        };
    }
    toEncodable() {
        return {
            RandomPack: {},
        };
    }
}
RandomPack.discriminator = 1;
RandomPack.kind = "RandomPack";
export class Bundle {
    constructor() {
        this.discriminator = 2;
        this.kind = "Bundle";
    }
    toJSON() {
        return {
            kind: "Bundle",
        };
    }
    toEncodable() {
        return {
            Bundle: {},
        };
    }
}
Bundle.discriminator = 2;
Bundle.kind = "Bundle";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("RandomDirect" in obj) {
        return new RandomDirect();
    }
    if ("RandomPack" in obj) {
        return new RandomPack();
    }
    if ("Bundle" in obj) {
        return new Bundle();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "RandomDirect": {
            return new RandomDirect();
        }
        case "RandomPack": {
            return new RandomPack();
        }
        case "Bundle": {
            return new Bundle();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "RandomDirect"),
        borsh.struct([], "RandomPack"),
        borsh.struct([], "Bundle"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
