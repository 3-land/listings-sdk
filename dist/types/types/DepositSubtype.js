import * as borsh from "@coral-xyz/borsh";
export class None {
    constructor() {
        this.discriminator = 0;
        this.kind = "None";
    }
    toJSON() {
        return {
            kind: "None",
        };
    }
    toEncodable() {
        return {
            None: {},
        };
    }
}
None.discriminator = 0;
None.kind = "None";
export class Three {
    constructor() {
        this.discriminator = 1;
        this.kind = "Three";
    }
    toJSON() {
        return {
            kind: "Three",
        };
    }
    toEncodable() {
        return {
            Three: {},
        };
    }
}
Three.discriminator = 1;
Three.kind = "Three";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("None" in obj) {
        return new None();
    }
    if ("Three" in obj) {
        return new Three();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "None": {
            return new None();
        }
        case "Three": {
            return new Three();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "None"),
        borsh.struct([], "Three"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
