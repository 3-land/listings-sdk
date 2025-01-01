import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class FakeBurnCount {
    constructor(fields) {
        this.key = fields.key;
        this.track = new types.DepositTrack(Object.assign({}, fields.track));
    }
    static layout(property) {
        return borsh.struct([borsh.u64("key"), types.DepositTrack.layout("track")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new FakeBurnCount({
            key: obj.key,
            track: types.DepositTrack.fromDecoded(obj.track),
        });
    }
    static toEncodable(fields) {
        return {
            key: fields.key,
            track: types.DepositTrack.toEncodable(fields.track),
        };
    }
    toJSON() {
        return {
            key: this.key.toString(),
            track: this.track.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new FakeBurnCount({
            key: new BN(obj.key),
            track: types.DepositTrack.fromJSON(obj.track),
        });
    }
    toEncodable() {
        return FakeBurnCount.toEncodable(this);
    }
}
