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
export class Token {
    constructor() {
        this.discriminator = 1;
        this.kind = "Token";
    }
    toJSON() {
        return {
            kind: "Token",
        };
    }
    toEncodable() {
        return {
            Token: {},
        };
    }
}
Token.discriminator = 1;
Token.kind = "Token";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("None" in obj) {
        return new None();
    }
    if ("Token" in obj) {
        return new Token();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "None": {
            return new None();
        }
        case "Token": {
            return new Token();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "None"),
        borsh.struct([], "Token"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
