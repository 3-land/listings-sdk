import * as borsh from "@coral-xyz/borsh";
export class Unclaimed {
    constructor() {
        this.discriminator = 0;
        this.kind = "Unclaimed";
    }
    toJSON() {
        return {
            kind: "Unclaimed",
        };
    }
    toEncodable() {
        return {
            Unclaimed: {},
        };
    }
}
Unclaimed.discriminator = 0;
Unclaimed.kind = "Unclaimed";
export class Claiming {
    constructor() {
        this.discriminator = 1;
        this.kind = "Claiming";
    }
    toJSON() {
        return {
            kind: "Claiming",
        };
    }
    toEncodable() {
        return {
            Claiming: {},
        };
    }
}
Claiming.discriminator = 1;
Claiming.kind = "Claiming";
export class Claimed {
    constructor() {
        this.discriminator = 2;
        this.kind = "Claimed";
    }
    toJSON() {
        return {
            kind: "Claimed",
        };
    }
    toEncodable() {
        return {
            Claimed: {},
        };
    }
}
Claimed.discriminator = 2;
Claimed.kind = "Claimed";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Unclaimed" in obj) {
        return new Unclaimed();
    }
    if ("Claiming" in obj) {
        return new Claiming();
    }
    if ("Claimed" in obj) {
        return new Claimed();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Unclaimed": {
            return new Unclaimed();
        }
        case "Claiming": {
            return new Claiming();
        }
        case "Claimed": {
            return new Claimed();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Unclaimed"),
        borsh.struct([], "Claiming"),
        borsh.struct([], "Claimed"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
