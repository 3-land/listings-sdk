import * as borsh from "@coral-xyz/borsh";
export class Available {
    constructor() {
        this.discriminator = 0;
        this.kind = "Available";
    }
    toJSON() {
        return {
            kind: "Available",
        };
    }
    toEncodable() {
        return {
            Available: {},
        };
    }
}
Available.discriminator = 0;
Available.kind = "Available";
export class Burning {
    constructor() {
        this.discriminator = 1;
        this.kind = "Burning";
    }
    toJSON() {
        return {
            kind: "Burning",
        };
    }
    toEncodable() {
        return {
            Burning: {},
        };
    }
}
Burning.discriminator = 1;
Burning.kind = "Burning";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Available" in obj) {
        return new Available();
    }
    if ("Burning" in obj) {
        return new Burning();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Available": {
            return new Available();
        }
        case "Burning": {
            return new Burning();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Available"),
        borsh.struct([], "Burning"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
