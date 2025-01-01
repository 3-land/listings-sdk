import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class Popularity {
    constructor(fields) {
        this.lastReset = fields.lastReset;
        this.count = fields.count;
        this.state = fields.state;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u16("lastReset"),
            borsh.u64("count"),
            types.PopularityState.layout("state"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Popularity({
            lastReset: obj.lastReset,
            count: obj.count,
            state: types.PopularityState.fromDecoded(obj.state),
        });
    }
    static toEncodable(fields) {
        return {
            lastReset: fields.lastReset,
            count: fields.count,
            state: fields.state.toEncodable(),
        };
    }
    toJSON() {
        return {
            lastReset: this.lastReset,
            count: this.count.toString(),
            state: this.state.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new Popularity({
            lastReset: obj.lastReset,
            count: new BN(obj.count),
            state: types.PopularityState.fromJSON(obj.state),
        });
    }
    toEncodable() {
        return Popularity.toEncodable(this);
    }
}
