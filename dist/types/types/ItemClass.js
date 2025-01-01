import * as borsh from "@coral-xyz/borsh";
export class Single {
    constructor() {
        this.discriminator = 0;
        this.kind = "Single";
    }
    toJSON() {
        return {
            kind: "Single",
        };
    }
    toEncodable() {
        return {
            Single: {},
        };
    }
}
Single.discriminator = 0;
Single.kind = "Single";
export class Pack {
    constructor() {
        this.discriminator = 1;
        this.kind = "Pack";
    }
    toJSON() {
        return {
            kind: "Pack",
        };
    }
    toEncodable() {
        return {
            Pack: {},
        };
    }
}
Pack.discriminator = 1;
Pack.kind = "Pack";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Single" in obj) {
        return new Single();
    }
    if ("Pack" in obj) {
        return new Pack();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Single": {
            return new Single();
        }
        case "Pack": {
            return new Pack();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Single"),
        borsh.struct([], "Pack"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
