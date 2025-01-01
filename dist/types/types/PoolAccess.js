import * as borsh from "@coral-xyz/borsh";
export class Cpi {
    constructor() {
        this.discriminator = 0;
        this.kind = "Cpi";
    }
    toJSON() {
        return {
            kind: "Cpi",
        };
    }
    toEncodable() {
        return {
            Cpi: {},
        };
    }
}
Cpi.discriminator = 0;
Cpi.kind = "Cpi";
export class Public {
    constructor() {
        this.discriminator = 1;
        this.kind = "Public";
    }
    toJSON() {
        return {
            kind: "Public",
        };
    }
    toEncodable() {
        return {
            Public: {},
        };
    }
}
Public.discriminator = 1;
Public.kind = "Public";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Cpi" in obj) {
        return new Cpi();
    }
    if ("Public" in obj) {
        return new Public();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Cpi": {
            return new Cpi();
        }
        case "Public": {
            return new Public();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Cpi"),
        borsh.struct([], "Public"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
