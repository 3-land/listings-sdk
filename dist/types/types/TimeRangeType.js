import * as borsh from "@coral-xyz/borsh";
export class BetweenHours {
    constructor() {
        this.discriminator = 0;
        this.kind = "BetweenHours";
    }
    toJSON() {
        return {
            kind: "BetweenHours",
        };
    }
    toEncodable() {
        return {
            BetweenHours: {},
        };
    }
}
BetweenHours.discriminator = 0;
BetweenHours.kind = "BetweenHours";
export class BetweenDays {
    constructor() {
        this.discriminator = 1;
        this.kind = "BetweenDays";
    }
    toJSON() {
        return {
            kind: "BetweenDays",
        };
    }
    toEncodable() {
        return {
            BetweenDays: {},
        };
    }
}
BetweenDays.discriminator = 1;
BetweenDays.kind = "BetweenDays";
export class BetweenHoursNegate {
    constructor() {
        this.discriminator = 2;
        this.kind = "BetweenHoursNegate";
    }
    toJSON() {
        return {
            kind: "BetweenHoursNegate",
        };
    }
    toEncodable() {
        return {
            BetweenHoursNegate: {},
        };
    }
}
BetweenHoursNegate.discriminator = 2;
BetweenHoursNegate.kind = "BetweenHoursNegate";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("BetweenHours" in obj) {
        return new BetweenHours();
    }
    if ("BetweenDays" in obj) {
        return new BetweenDays();
    }
    if ("BetweenHoursNegate" in obj) {
        return new BetweenHoursNegate();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "BetweenHours": {
            return new BetweenHours();
        }
        case "BetweenDays": {
            return new BetweenDays();
        }
        case "BetweenHoursNegate": {
            return new BetweenHoursNegate();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "BetweenHours"),
        borsh.struct([], "BetweenDays"),
        borsh.struct([], "BetweenHoursNegate"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
