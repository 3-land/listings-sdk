import * as borsh from "@coral-xyz/borsh";
export class Original {
    constructor() {
        this.discriminator = 0;
        this.kind = "Original";
    }
    toJSON() {
        return {
            kind: "Original",
        };
    }
    toEncodable() {
        return {
            Original: {},
        };
    }
}
Original.discriminator = 0;
Original.kind = "Original";
export class Token2022 {
    constructor() {
        this.discriminator = 1;
        this.kind = "Token2022";
    }
    toJSON() {
        return {
            kind: "Token2022",
        };
    }
    toEncodable() {
        return {
            Token2022: {},
        };
    }
}
Token2022.discriminator = 1;
Token2022.kind = "Token2022";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Original" in obj) {
        return new Original();
    }
    if ("Token2022" in obj) {
        return new Token2022();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Original": {
            return new Original();
        }
        case "Token2022": {
            return new Token2022();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Original"),
        borsh.struct([], "Token2022"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
