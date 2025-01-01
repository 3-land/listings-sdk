import * as borsh from "@coral-xyz/borsh";
export class Active {
    constructor() {
        this.discriminator = 0;
        this.kind = "Active";
    }
    toJSON() {
        return {
            kind: "Active",
        };
    }
    toEncodable() {
        return {
            Active: {},
        };
    }
}
Active.discriminator = 0;
Active.kind = "Active";
export class Hidden {
    constructor() {
        this.discriminator = 1;
        this.kind = "Hidden";
    }
    toJSON() {
        return {
            kind: "Hidden",
        };
    }
    toEncodable() {
        return {
            Hidden: {},
        };
    }
}
Hidden.discriminator = 1;
Hidden.kind = "Hidden";
export class Inactive {
    constructor() {
        this.discriminator = 2;
        this.kind = "Inactive";
    }
    toJSON() {
        return {
            kind: "Inactive",
        };
    }
    toEncodable() {
        return {
            Inactive: {},
        };
    }
}
Inactive.discriminator = 2;
Inactive.kind = "Inactive";
export class Retired {
    constructor() {
        this.discriminator = 3;
        this.kind = "Retired";
    }
    toJSON() {
        return {
            kind: "Retired",
        };
    }
    toEncodable() {
        return {
            Retired: {},
        };
    }
}
Retired.discriminator = 3;
Retired.kind = "Retired";
export class SoldOut {
    constructor() {
        this.discriminator = 4;
        this.kind = "SoldOut";
    }
    toJSON() {
        return {
            kind: "SoldOut",
        };
    }
    toEncodable() {
        return {
            SoldOut: {},
        };
    }
}
SoldOut.discriminator = 4;
SoldOut.kind = "SoldOut";
export class None {
    constructor() {
        this.discriminator = 5;
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
None.discriminator = 5;
None.kind = "None";
export class NotReady {
    constructor() {
        this.discriminator = 6;
        this.kind = "NotReady";
    }
    toJSON() {
        return {
            kind: "NotReady",
        };
    }
    toEncodable() {
        return {
            NotReady: {},
        };
    }
}
NotReady.discriminator = 6;
NotReady.kind = "NotReady";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Active" in obj) {
        return new Active();
    }
    if ("Hidden" in obj) {
        return new Hidden();
    }
    if ("Inactive" in obj) {
        return new Inactive();
    }
    if ("Retired" in obj) {
        return new Retired();
    }
    if ("SoldOut" in obj) {
        return new SoldOut();
    }
    if ("None" in obj) {
        return new None();
    }
    if ("NotReady" in obj) {
        return new NotReady();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Active": {
            return new Active();
        }
        case "Hidden": {
            return new Hidden();
        }
        case "Inactive": {
            return new Inactive();
        }
        case "Retired": {
            return new Retired();
        }
        case "SoldOut": {
            return new SoldOut();
        }
        case "None": {
            return new None();
        }
        case "NotReady": {
            return new NotReady();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Active"),
        borsh.struct([], "Hidden"),
        borsh.struct([], "Inactive"),
        borsh.struct([], "Retired"),
        borsh.struct([], "SoldOut"),
        borsh.struct([], "None"),
        borsh.struct([], "NotReady"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
