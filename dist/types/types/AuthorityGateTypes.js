import * as borsh from "@coral-xyz/borsh";
export class IPGate {
    constructor() {
        this.discriminator = 0;
        this.kind = "IPGate";
    }
    toJSON() {
        return {
            kind: "IPGate",
        };
    }
    toEncodable() {
        return {
            IPGate: {},
        };
    }
}
IPGate.discriminator = 0;
IPGate.kind = "IPGate";
export class BiometricsGate {
    constructor() {
        this.discriminator = 1;
        this.kind = "BiometricsGate";
    }
    toJSON() {
        return {
            kind: "BiometricsGate",
        };
    }
    toEncodable() {
        return {
            BiometricsGate: {},
        };
    }
}
BiometricsGate.discriminator = 1;
BiometricsGate.kind = "BiometricsGate";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("IPGate" in obj) {
        return new IPGate();
    }
    if ("BiometricsGate" in obj) {
        return new BiometricsGate();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "IPGate": {
            return new IPGate();
        }
        case "BiometricsGate": {
            return new BiometricsGate();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "IPGate"),
        borsh.struct([], "BiometricsGate"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
