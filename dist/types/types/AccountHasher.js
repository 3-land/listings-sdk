import { PublicKey } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class AccountHasher {
    constructor(fields) {
        this.seeds = fields.seeds.map((item) => new types.Seed(Object.assign({}, item)));
        this.insertAt = fields.insertAt;
        this.program = fields.program;
        this.bump = fields.bump;
    }
    static layout(property) {
        return borsh.struct([
            borsh.vec(types.Seed.layout(), "seeds"),
            borsh.u8("insertAt"),
            borsh.publicKey("program"),
            borsh.u8("bump"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AccountHasher({
            seeds: obj.seeds.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.Seed.fromDecoded(item)),
            insertAt: obj.insertAt,
            program: obj.program,
            bump: obj.bump,
        });
    }
    static toEncodable(fields) {
        return {
            seeds: fields.seeds.map((item) => types.Seed.toEncodable(item)),
            insertAt: fields.insertAt,
            program: fields.program,
            bump: fields.bump,
        };
    }
    toJSON() {
        return {
            seeds: this.seeds.map((item) => item.toJSON()),
            insertAt: this.insertAt,
            program: this.program.toString(),
            bump: this.bump,
        };
    }
    static fromJSON(obj) {
        return new AccountHasher({
            seeds: obj.seeds.map((item) => types.Seed.fromJSON(item)),
            insertAt: obj.insertAt,
            program: new PublicKey(obj.program),
            bump: obj.bump,
        });
    }
    toEncodable() {
        return AccountHasher.toEncodable(this);
    }
}
