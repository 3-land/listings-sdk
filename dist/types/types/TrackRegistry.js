import * as borsh from "@coral-xyz/borsh";
export class NoTrack {
    constructor() {
        this.discriminator = 0;
        this.kind = "NoTrack";
    }
    toJSON() {
        return {
            kind: "NoTrack",
        };
    }
    toEncodable() {
        return {
            NoTrack: {},
        };
    }
}
NoTrack.discriminator = 0;
NoTrack.kind = "NoTrack";
export class Tracked {
    constructor() {
        this.discriminator = 1;
        this.kind = "Tracked";
    }
    toJSON() {
        return {
            kind: "Tracked",
        };
    }
    toEncodable() {
        return {
            Tracked: {},
        };
    }
}
Tracked.discriminator = 1;
Tracked.kind = "Tracked";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("NoTrack" in obj) {
        return new NoTrack();
    }
    if ("Tracked" in obj) {
        return new Tracked();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "NoTrack": {
            return new NoTrack();
        }
        case "Tracked": {
            return new Tracked();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "NoTrack"),
        borsh.struct([], "Tracked"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
