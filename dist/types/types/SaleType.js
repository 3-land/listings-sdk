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
export class NoMarketFee {
    constructor() {
        this.discriminator = 1;
        this.kind = "NoMarketFee";
    }
    toJSON() {
        return {
            kind: "NoMarketFee",
        };
    }
    toEncodable() {
        return {
            NoMarketFee: {},
        };
    }
}
NoMarketFee.discriminator = 1;
NoMarketFee.kind = "NoMarketFee";
export class Partnership {
    constructor() {
        this.discriminator = 2;
        this.kind = "Partnership";
    }
    toJSON() {
        return {
            kind: "Partnership",
        };
    }
    toEncodable() {
        return {
            Partnership: {},
        };
    }
}
Partnership.discriminator = 2;
Partnership.kind = "Partnership";
export class LocksInVault {
    constructor() {
        this.discriminator = 3;
        this.kind = "LocksInVault";
    }
    toJSON() {
        return {
            kind: "LocksInVault",
        };
    }
    toEncodable() {
        return {
            LocksInVault: {},
        };
    }
}
LocksInVault.discriminator = 3;
LocksInVault.kind = "LocksInVault";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Normal" in obj) {
        return new Normal();
    }
    if ("NoMarketFee" in obj) {
        return new NoMarketFee();
    }
    if ("Partnership" in obj) {
        return new Partnership();
    }
    if ("LocksInVault" in obj) {
        return new LocksInVault();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Normal": {
            return new Normal();
        }
        case "NoMarketFee": {
            return new NoMarketFee();
        }
        case "Partnership": {
            return new Partnership();
        }
        case "LocksInVault": {
            return new LocksInVault();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Normal"),
        borsh.struct([], "NoMarketFee"),
        borsh.struct([], "Partnership"),
        borsh.struct([], "LocksInVault"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
