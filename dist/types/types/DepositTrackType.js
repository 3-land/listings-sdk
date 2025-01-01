import * as borsh from "@coral-xyz/borsh";
export class Creator {
    constructor() {
        this.discriminator = 0;
        this.kind = "Creator";
    }
    toJSON() {
        return {
            kind: "Creator",
        };
    }
    toEncodable() {
        return {
            Creator: {},
        };
    }
}
Creator.discriminator = 0;
Creator.kind = "Creator";
export class PdaCreator {
    constructor() {
        this.discriminator = 1;
        this.kind = "PdaCreator";
    }
    toJSON() {
        return {
            kind: "PdaCreator",
        };
    }
    toEncodable() {
        return {
            PdaCreator: {},
        };
    }
}
PdaCreator.discriminator = 1;
PdaCreator.kind = "PdaCreator";
export class Collection {
    constructor() {
        this.discriminator = 2;
        this.kind = "Collection";
    }
    toJSON() {
        return {
            kind: "Collection",
        };
    }
    toEncodable() {
        return {
            Collection: {},
        };
    }
}
Collection.discriminator = 2;
Collection.kind = "Collection";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Creator" in obj) {
        return new Creator();
    }
    if ("PdaCreator" in obj) {
        return new PdaCreator();
    }
    if ("Collection" in obj) {
        return new Collection();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Creator": {
            return new Creator();
        }
        case "PdaCreator": {
            return new PdaCreator();
        }
        case "Collection": {
            return new Collection();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Creator"),
        borsh.struct([], "PdaCreator"),
        borsh.struct([], "Collection"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
