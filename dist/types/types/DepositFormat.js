import * as borsh from "@coral-xyz/borsh";
export class Cnft {
    constructor() {
        this.discriminator = 0;
        this.kind = "Cnft";
    }
    toJSON() {
        return {
            kind: "Cnft",
        };
    }
    toEncodable() {
        return {
            Cnft: {},
        };
    }
}
Cnft.discriminator = 0;
Cnft.kind = "Cnft";
export class Nft {
    constructor() {
        this.discriminator = 1;
        this.kind = "Nft";
    }
    toJSON() {
        return {
            kind: "Nft",
        };
    }
    toEncodable() {
        return {
            Nft: {},
        };
    }
}
Nft.discriminator = 1;
Nft.kind = "Nft";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Cnft" in obj) {
        return new Cnft();
    }
    if ("Nft" in obj) {
        return new Nft();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Cnft": {
            return new Cnft();
        }
        case "Nft": {
            return new Nft();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Cnft"),
        borsh.struct([], "Nft"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
