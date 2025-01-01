import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class FakeDeposit {
    constructor(fields) {
        this.key = fields.key;
        this.track = new types.BurnCount(Object.assign({}, fields.track));
    }
    static layout(property) {
        return borsh.struct([borsh.u64("key"), types.BurnCount.layout("track")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new FakeDeposit({
            key: obj.key,
            track: types.BurnCount.fromDecoded(obj.track),
        });
    }
    static toEncodable(fields) {
        return {
            key: fields.key,
            track: types.BurnCount.toEncodable(fields.track),
        };
    }
    toJSON() {
        return {
            key: this.key.toString(),
            track: this.track.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new FakeDeposit({
            key: new BN(obj.key),
            track: types.BurnCount.fromJSON(obj.track),
        });
    }
    toEncodable() {
        return FakeDeposit.toEncodable(this);
    }
}
