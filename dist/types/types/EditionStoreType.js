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
export class Name {
    constructor() {
        this.discriminator = 1;
        this.kind = "Name";
    }
    toJSON() {
        return {
            kind: "Name",
        };
    }
    toEncodable() {
        return {
            Name: {},
        };
    }
}
Name.discriminator = 1;
Name.kind = "Name";
export class Url {
    constructor() {
        this.discriminator = 2;
        this.kind = "Url";
    }
    toJSON() {
        return {
            kind: "Url",
        };
    }
    toEncodable() {
        return {
            Url: {},
        };
    }
}
Url.discriminator = 2;
Url.kind = "Url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("None" in obj) {
        return new None();
    }
    if ("Name" in obj) {
        return new Name();
    }
    if ("Url" in obj) {
        return new Url();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "None": {
            return new None();
        }
        case "Name": {
            return new Name();
        }
        case "Url": {
            return new Url();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "None"),
        borsh.struct([], "Name"),
        borsh.struct([], "Url"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
