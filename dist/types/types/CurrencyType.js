import { PublicKey } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class Native {
    constructor() {
        this.discriminator = 0;
        this.kind = "Native";
    }
    toJSON() {
        return {
            kind: "Native",
        };
    }
    toEncodable() {
        return {
            Native: {},
        };
    }
}
Native.discriminator = 0;
Native.kind = "Native";
export class Spl {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "Spl";
        this.value = {
            id: value.id,
        };
    }
    toJSON() {
        return {
            kind: "Spl",
            value: {
                id: this.value.id.toString(),
            },
        };
    }
    toEncodable() {
        return {
            Spl: {
                id: this.value.id,
            },
        };
    }
}
Spl.discriminator = 1;
Spl.kind = "Spl";
export class Collection {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "Collection";
        this.value = {
            id: value.id,
        };
    }
    toJSON() {
        return {
            kind: "Collection",
            value: {
                id: this.value.id.toString(),
            },
        };
    }
    toEncodable() {
        return {
            Collection: {
                id: this.value.id,
            },
        };
    }
}
Collection.discriminator = 2;
Collection.kind = "Collection";
export class Creator {
    constructor(value) {
        this.discriminator = 3;
        this.kind = "Creator";
        this.value = {
            id: value.id,
        };
    }
    toJSON() {
        return {
            kind: "Creator",
            value: {
                id: this.value.id.toString(),
            },
        };
    }
    toEncodable() {
        return {
            Creator: {
                id: this.value.id,
            },
        };
    }
}
Creator.discriminator = 3;
Creator.kind = "Creator";
export class None {
    constructor() {
        this.discriminator = 4;
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
None.discriminator = 4;
None.kind = "None";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Native" in obj) {
        return new Native();
    }
    if ("Spl" in obj) {
        const val = obj["Spl"];
        return new Spl({
            id: val["id"],
        });
    }
    if ("Collection" in obj) {
        const val = obj["Collection"];
        return new Collection({
            id: val["id"],
        });
    }
    if ("Creator" in obj) {
        const val = obj["Creator"];
        return new Creator({
            id: val["id"],
        });
    }
    if ("None" in obj) {
        return new None();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Native": {
            return new Native();
        }
        case "Spl": {
            return new Spl({
                id: new PublicKey(obj.value.id),
            });
        }
        case "Collection": {
            return new Collection({
                id: new PublicKey(obj.value.id),
            });
        }
        case "Creator": {
            return new Creator({
                id: new PublicKey(obj.value.id),
            });
        }
        case "None": {
            return new None();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Native"),
        borsh.struct([borsh.publicKey("id")], "Spl"),
        borsh.struct([borsh.publicKey("id")], "Collection"),
        borsh.struct([borsh.publicKey("id")], "Creator"),
        borsh.struct([], "None"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
