import * as borsh from "@coral-xyz/borsh";
export class CollectionBurn {
    constructor() {
        this.discriminator = 0;
        this.kind = "CollectionBurn";
    }
    toJSON() {
        return {
            kind: "CollectionBurn",
        };
    }
    toEncodable() {
        return {
            CollectionBurn: {},
        };
    }
}
CollectionBurn.discriminator = 0;
CollectionBurn.kind = "CollectionBurn";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("CollectionBurn" in obj) {
        return new CollectionBurn();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "CollectionBurn": {
            return new CollectionBurn();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([borsh.struct([], "CollectionBurn")]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
