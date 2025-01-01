import * as borsh from "@coral-xyz/borsh";
export class Closed {
    constructor() {
        this.discriminator = 0;
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
Closed.discriminator = 0;
Closed.kind = "Closed";
export class Opened {
    constructor() {
        this.discriminator = 1;
        this.kind = "Opened";
    }
    toJSON() {
        return {
            kind: "Opened",
        };
    }
    toEncodable() {
        return {
            Opened: {},
        };
    }
}
Opened.discriminator = 1;
Opened.kind = "Opened";
export class Unassigned {
    constructor() {
        this.discriminator = 2;
        this.kind = "Unassigned";
    }
    toJSON() {
        return {
            kind: "Unassigned",
        };
    }
    toEncodable() {
        return {
            Unassigned: {},
        };
    }
}
Unassigned.discriminator = 2;
Unassigned.kind = "Unassigned";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Closed" in obj) {
        return new Closed();
    }
    if ("Opened" in obj) {
        return new Opened();
    }
    if ("Unassigned" in obj) {
        return new Unassigned();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Closed": {
            return new Closed();
        }
        case "Opened": {
            return new Opened();
        }
        case "Unassigned": {
            return new Unassigned();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Closed"),
        borsh.struct([], "Opened"),
        borsh.struct([], "Unassigned"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
