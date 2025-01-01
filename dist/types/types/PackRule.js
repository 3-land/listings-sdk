import * as borsh from "@coral-xyz/borsh";
export class CoolDownToOpen {
    constructor(value) {
        this.discriminator = 0;
        this.kind = "CoolDownToOpen";
        this.value = {
            seconds: value.seconds,
        };
    }
    toJSON() {
        return {
            kind: "CoolDownToOpen",
            value: {
                seconds: this.value.seconds,
            },
        };
    }
    toEncodable() {
        return {
            CoolDownToOpen: {
                seconds: this.value.seconds,
            },
        };
    }
}
CoolDownToOpen.discriminator = 0;
CoolDownToOpen.kind = "CoolDownToOpen";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("CoolDownToOpen" in obj) {
        const val = obj["CoolDownToOpen"];
        return new CoolDownToOpen({
            seconds: val["seconds"],
        });
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "CoolDownToOpen": {
            return new CoolDownToOpen({
                seconds: obj.value.seconds,
            });
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([borsh.u32("seconds")], "CoolDownToOpen"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
