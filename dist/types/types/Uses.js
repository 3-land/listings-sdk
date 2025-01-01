import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class Uses {
    constructor(fields) {
        this.useMethod = fields.useMethod;
        this.remaining = fields.remaining;
        this.total = fields.total;
    }
    static layout(property) {
        return borsh.struct([
            types.UseMethod.layout("useMethod"),
            borsh.u64("remaining"),
            borsh.u64("total"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Uses({
            useMethod: types.UseMethod.fromDecoded(obj.useMethod),
            remaining: obj.remaining,
            total: obj.total,
        });
    }
    static toEncodable(fields) {
        return {
            useMethod: fields.useMethod.toEncodable(),
            remaining: fields.remaining,
            total: fields.total,
        };
    }
    toJSON() {
        return {
            useMethod: this.useMethod.toJSON(),
            remaining: this.remaining.toString(),
            total: this.total.toString(),
        };
    }
    static fromJSON(obj) {
        return new Uses({
            useMethod: types.UseMethod.fromJSON(obj.useMethod),
            remaining: new BN(obj.remaining),
            total: new BN(obj.total),
        });
    }
    toEncodable() {
        return Uses.toEncodable(this);
    }
}
