import * as borsh from "@coral-xyz/borsh";
export class None {
    constructor() {
        this.discriminator = 0;
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
None.discriminator = 0;
None.kind = "None";
export class Revealer {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "Revealer";
        this.value = {
            random: value.random,
        };
    }
    toJSON() {
        return {
            kind: "Revealer",
            value: {
                random: this.value.random,
            },
        };
    }
    toEncodable() {
        return {
            Revealer: {
                random: this.value.random,
            },
        };
    }
}
Revealer.discriminator = 1;
Revealer.kind = "Revealer";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("None" in obj) {
        return new None();
    }
    if ("Revealer" in obj) {
        const val = obj["Revealer"];
        return new Revealer({
            random: val["random"],
        });
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "None": {
            return new None();
        }
        case "Revealer": {
            return new Revealer({
                random: obj.value.random,
            });
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "None"),
        borsh.struct([borsh.u16("random")], "Revealer"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
