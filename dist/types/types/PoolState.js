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
export class Closed {
    constructor() {
        this.discriminator = 1;
        this.kind = "Closed";
    }
    toJSON() {
        return {
            kind: "Closed",
        };
    }
    toEncodable() {
        return {
            Closed: {},
        };
    }
}
Closed.discriminator = 1;
Closed.kind = "Closed";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Available" in obj) {
        return new Available();
    }
    if ("Closed" in obj) {
        return new Closed();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Available": {
            return new Available();
        }
        case "Closed": {
            return new Closed();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Available"),
        borsh.struct([], "Closed"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
