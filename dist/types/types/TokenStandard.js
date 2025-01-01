import * as borsh from "@coral-xyz/borsh";
export class NonFungible {
    constructor() {
        this.discriminator = 0;
        this.kind = "NonFungible";
    }
    toJSON() {
        return {
            kind: "NonFungible",
        };
    }
    toEncodable() {
        return {
            NonFungible: {},
        };
    }
}
NonFungible.discriminator = 0;
NonFungible.kind = "NonFungible";
export class FungibleAsset {
    constructor() {
        this.discriminator = 1;
        this.kind = "FungibleAsset";
    }
    toJSON() {
        return {
            kind: "FungibleAsset",
        };
    }
    toEncodable() {
        return {
            FungibleAsset: {},
        };
    }
}
FungibleAsset.discriminator = 1;
FungibleAsset.kind = "FungibleAsset";
export class Fungible {
    constructor() {
        this.discriminator = 2;
        this.kind = "Fungible";
    }
    toJSON() {
        return {
            kind: "Fungible",
        };
    }
    toEncodable() {
        return {
            Fungible: {},
        };
    }
}
Fungible.discriminator = 2;
Fungible.kind = "Fungible";
export class NonFungibleEdition {
    constructor() {
        this.discriminator = 3;
        this.kind = "NonFungibleEdition";
    }
    toJSON() {
        return {
            kind: "NonFungibleEdition",
        };
    }
    toEncodable() {
        return {
            NonFungibleEdition: {},
        };
    }
}
NonFungibleEdition.discriminator = 3;
NonFungibleEdition.kind = "NonFungibleEdition";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("NonFungible" in obj) {
        return new NonFungible();
    }
    if ("FungibleAsset" in obj) {
        return new FungibleAsset();
    }
    if ("Fungible" in obj) {
        return new Fungible();
    }
    if ("NonFungibleEdition" in obj) {
        return new NonFungibleEdition();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "NonFungible": {
            return new NonFungible();
        }
        case "FungibleAsset": {
            return new FungibleAsset();
        }
        case "Fungible": {
            return new Fungible();
        }
        case "NonFungibleEdition": {
            return new NonFungibleEdition();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "NonFungible"),
        borsh.struct([], "FungibleAsset"),
        borsh.struct([], "Fungible"),
        borsh.struct([], "NonFungibleEdition"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
