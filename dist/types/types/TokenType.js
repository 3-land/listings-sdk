import * as borsh from "@coral-xyz/borsh";
export class Basic {
    constructor() {
        this.discriminator = 0;
        this.kind = "Basic";
    }
    toJSON() {
        return {
            kind: "Basic",
        };
    }
    toEncodable() {
        return {
            Basic: {},
        };
    }
}
Basic.discriminator = 0;
Basic.kind = "Basic";
export class OnlyUp {
    constructor() {
        this.discriminator = 1;
        this.kind = "OnlyUp";
    }
    toJSON() {
        return {
            kind: "OnlyUp",
        };
    }
    toEncodable() {
        return {
            OnlyUp: {},
        };
    }
}
OnlyUp.discriminator = 1;
OnlyUp.kind = "OnlyUp";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Basic" in obj) {
        return new Basic();
    }
    if ("OnlyUp" in obj) {
        return new OnlyUp();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Basic": {
            return new Basic();
        }
        case "OnlyUp": {
            return new OnlyUp();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Basic"),
        borsh.struct([], "OnlyUp"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
