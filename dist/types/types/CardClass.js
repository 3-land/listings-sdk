import * as borsh from "@coral-xyz/borsh";
export class Normal {
    constructor() {
        this.discriminator = 0;
        this.kind = "Normal";
    }
    toJSON() {
        return {
            kind: "Normal",
        };
    }
    toEncodable() {
        return {
            Normal: {},
        };
    }
}
Normal.discriminator = 0;
Normal.kind = "Normal";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Normal" in obj) {
        return new Normal();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Normal": {
            return new Normal();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([borsh.struct([], "Normal")]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
