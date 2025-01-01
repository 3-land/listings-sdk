import * as borsh from "@coral-xyz/borsh";
export class New {
    constructor() {
        this.discriminator = 0;
        this.kind = "New";
    }
    toJSON() {
        return {
            kind: "New",
        };
    }
    toEncodable() {
        return {
            New: {},
        };
    }
}
New.discriminator = 0;
New.kind = "New";
export class Active {
    constructor() {
        this.discriminator = 1;
        this.kind = "Active";
    }
    toJSON() {
        return {
            kind: "Active",
        };
    }
    toEncodable() {
        return {
            Active: {},
        };
    }
}
Active.discriminator = 1;
Active.kind = "Active";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("New" in obj) {
        return new New();
    }
    if ("Active" in obj) {
        return new Active();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "New": {
            return new New();
        }
        case "Active": {
            return new Active();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "New"),
        borsh.struct([], "Active"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
