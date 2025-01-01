import * as borsh from "@coral-xyz/borsh";
export class SingleBuyV1 {
    constructor() {
        this.discriminator = 0;
        this.kind = "SingleBuyV1";
    }
    toJSON() {
        return {
            kind: "SingleBuyV1",
        };
    }
    toEncodable() {
        return {
            SingleBuyV1: {},
        };
    }
}
SingleBuyV1.discriminator = 0;
SingleBuyV1.kind = "SingleBuyV1";
export class PackBuyV1 {
    constructor() {
        this.discriminator = 1;
        this.kind = "PackBuyV1";
    }
    toJSON() {
        return {
            kind: "PackBuyV1",
        };
    }
    toEncodable() {
        return {
            PackBuyV1: {},
        };
    }
}
PackBuyV1.discriminator = 1;
PackBuyV1.kind = "PackBuyV1";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("SingleBuyV1" in obj) {
        return new SingleBuyV1();
    }
    if ("PackBuyV1" in obj) {
        return new PackBuyV1();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "SingleBuyV1": {
            return new SingleBuyV1();
        }
        case "PackBuyV1": {
            return new PackBuyV1();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "SingleBuyV1"),
        borsh.struct([], "PackBuyV1"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
