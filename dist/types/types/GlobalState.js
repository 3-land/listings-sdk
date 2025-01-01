import * as borsh from "@coral-xyz/borsh";
export class HiddenBySystem {
    constructor() {
        this.discriminator = 0;
        this.kind = "HiddenBySystem";
    }
    toJSON() {
        return {
            kind: "HiddenBySystem",
        };
    }
    toEncodable() {
        return {
            HiddenBySystem: {},
        };
    }
}
HiddenBySystem.discriminator = 0;
HiddenBySystem.kind = "HiddenBySystem";
export class Public {
    constructor() {
        this.discriminator = 1;
        this.kind = "Public";
    }
    toJSON() {
        return {
            kind: "Public",
        };
    }
    toEncodable() {
        return {
            Public: {},
        };
    }
}
Public.discriminator = 1;
Public.kind = "Public";
export class HiddenByUser {
    constructor() {
        this.discriminator = 2;
        this.kind = "HiddenByUser";
    }
    toJSON() {
        return {
            kind: "HiddenByUser",
        };
    }
    toEncodable() {
        return {
            HiddenByUser: {},
        };
    }
}
HiddenByUser.discriminator = 2;
HiddenByUser.kind = "HiddenByUser";
export class FlaggedPirate {
    constructor() {
        this.discriminator = 3;
        this.kind = "FlaggedPirate";
    }
    toJSON() {
        return {
            kind: "FlaggedPirate",
        };
    }
    toEncodable() {
        return {
            FlaggedPirate: {},
        };
    }
}
FlaggedPirate.discriminator = 3;
FlaggedPirate.kind = "FlaggedPirate";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("HiddenBySystem" in obj) {
        return new HiddenBySystem();
    }
    if ("Public" in obj) {
        return new Public();
    }
    if ("HiddenByUser" in obj) {
        return new HiddenByUser();
    }
    if ("FlaggedPirate" in obj) {
        return new FlaggedPirate();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "HiddenBySystem": {
            return new HiddenBySystem();
        }
        case "Public": {
            return new Public();
        }
        case "HiddenByUser": {
            return new HiddenByUser();
        }
        case "FlaggedPirate": {
            return new FlaggedPirate();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "HiddenBySystem"),
        borsh.struct([], "Public"),
        borsh.struct([], "HiddenByUser"),
        borsh.struct([], "FlaggedPirate"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
