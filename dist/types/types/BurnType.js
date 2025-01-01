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
export class InTX {
    constructor() {
        this.discriminator = 1;
        this.kind = "InTX";
    }
    toJSON() {
        return {
            kind: "InTX",
        };
    }
    toEncodable() {
        return {
            InTX: {},
        };
    }
}
InTX.discriminator = 1;
InTX.kind = "InTX";
export class Progressed {
    constructor() {
        this.discriminator = 2;
        this.kind = "Progressed";
    }
    toJSON() {
        return {
            kind: "Progressed",
        };
    }
    toEncodable() {
        return {
            Progressed: {},
        };
    }
}
Progressed.discriminator = 2;
Progressed.kind = "Progressed";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("None" in obj) {
        return new None();
    }
    if ("InTX" in obj) {
        return new InTX();
    }
    if ("Progressed" in obj) {
        return new Progressed();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "None": {
            return new None();
        }
        case "InTX": {
            return new InTX();
        }
        case "Progressed": {
            return new Progressed();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "None"),
        borsh.struct([], "InTX"),
        borsh.struct([], "Progressed"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
