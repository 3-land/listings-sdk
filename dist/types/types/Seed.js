import * as borsh from "@coral-xyz/borsh";
export class Seed {
    constructor(fields) {
        this.seed = fields.seed;
    }
    static layout(property) {
        return borsh.struct([borsh.vecU8("seed")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Seed({
            seed: new Uint8Array(obj.seed.buffer, obj.seed.byteOffset, obj.seed.length),
        });
    }
    static toEncodable(fields) {
        return {
            seed: Buffer.from(fields.seed.buffer, fields.seed.byteOffset, fields.seed.length),
        };
    }
    toJSON() {
        return {
            seed: Array.from(this.seed.values()),
        };
    }
    static fromJSON(obj) {
        return new Seed({
            seed: Uint8Array.from(obj.seed),
        });
    }
    toEncodable() {
        return Seed.toEncodable(this);
    }
}
