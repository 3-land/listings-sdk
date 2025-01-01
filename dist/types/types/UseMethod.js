import * as borsh from "@coral-xyz/borsh";
export class Burn {
    constructor() {
        this.discriminator = 0;
        this.kind = "Burn";
    }
    toJSON() {
        return {
            kind: "Burn",
        };
    }
    toEncodable() {
        return {
            Burn: {},
        };
    }
}
Burn.discriminator = 0;
Burn.kind = "Burn";
export class Multiple {
    constructor() {
        this.discriminator = 1;
        this.kind = "Multiple";
    }
    toJSON() {
        return {
            kind: "Multiple",
        };
    }
    toEncodable() {
        return {
            Multiple: {},
        };
    }
}
Multiple.discriminator = 1;
Multiple.kind = "Multiple";
export class Single {
    constructor() {
        this.discriminator = 2;
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
Single.discriminator = 2;
Single.kind = "Single";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Burn" in obj) {
        return new Burn();
    }
    if ("Multiple" in obj) {
        return new Multiple();
    }
    if ("Single" in obj) {
        return new Single();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Burn": {
            return new Burn();
        }
        case "Multiple": {
            return new Multiple();
        }
        case "Single": {
            return new Single();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Burn"),
        borsh.struct([], "Multiple"),
        borsh.struct([], "Single"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
