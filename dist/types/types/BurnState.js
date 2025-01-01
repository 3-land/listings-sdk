import * as borsh from "@coral-xyz/borsh";
export class NonPending {
    constructor() {
        this.discriminator = 0;
        this.kind = "NonPending";
    }
    toJSON() {
        return {
            kind: "NonPending",
        };
    }
    toEncodable() {
        return {
            NonPending: {},
        };
    }
}
NonPending.discriminator = 0;
NonPending.kind = "NonPending";
export class Pending {
    constructor() {
        this.discriminator = 1;
        this.kind = "Pending";
    }
    toJSON() {
        return {
            kind: "Pending",
        };
    }
    toEncodable() {
        return {
            Pending: {},
        };
    }
}
Pending.discriminator = 1;
Pending.kind = "Pending";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("NonPending" in obj) {
        return new NonPending();
    }
    if ("Pending" in obj) {
        return new Pending();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "NonPending": {
            return new NonPending();
        }
        case "Pending": {
            return new Pending();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "NonPending"),
        borsh.struct([], "Pending"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
