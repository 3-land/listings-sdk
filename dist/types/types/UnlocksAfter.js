import * as borsh from "@coral-xyz/borsh";
export class MintingOut {
    constructor() {
        this.discriminator = 0;
        this.kind = "MintingOut";
    }
    toJSON() {
        return {
            kind: "MintingOut",
        };
    }
    toEncodable() {
        return {
            MintingOut: {},
        };
    }
}
MintingOut.discriminator = 0;
MintingOut.kind = "MintingOut";
export class Supply {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "Supply";
        this.value = {
            limit: value.limit,
        };
    }
    toJSON() {
        return {
            kind: "Supply",
            value: {
                limit: this.value.limit,
            },
        };
    }
    toEncodable() {
        return {
            Supply: {
                limit: this.value.limit,
            },
        };
    }
}
Supply.discriminator = 1;
Supply.kind = "Supply";
export class Hours {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "Hours";
        this.value = {
            hours: value.hours,
        };
    }
    toJSON() {
        return {
            kind: "Hours",
            value: {
                hours: this.value.hours,
            },
        };
    }
    toEncodable() {
        return {
            Hours: {
                hours: this.value.hours,
            },
        };
    }
}
Hours.discriminator = 2;
Hours.kind = "Hours";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("MintingOut" in obj) {
        return new MintingOut();
    }
    if ("Supply" in obj) {
        const val = obj["Supply"];
        return new Supply({
            limit: val["limit"],
        });
    }
    if ("Hours" in obj) {
        const val = obj["Hours"];
        return new Hours({
            hours: val["hours"],
        });
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "MintingOut": {
            return new MintingOut();
        }
        case "Supply": {
            return new Supply({
                limit: obj.value.limit,
            });
        }
        case "Hours": {
            return new Hours({
                hours: obj.value.hours,
            });
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "MintingOut"),
        borsh.struct([borsh.u32("limit")], "Supply"),
        borsh.struct([borsh.u16("hours")], "Hours"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
