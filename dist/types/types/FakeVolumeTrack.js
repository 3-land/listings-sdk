import { PublicKey } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class FakeVolumeTrack {
    constructor(fields) {
        this.key = fields.key;
        this.track = new types.VolumeTrack(Object.assign({}, fields.track));
    }
    static layout(property) {
        return borsh.struct([borsh.publicKey("key"), types.VolumeTrack.layout("track")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new FakeVolumeTrack({
            key: obj.key,
            track: types.VolumeTrack.fromDecoded(obj.track),
        });
    }
    static toEncodable(fields) {
        return {
            key: fields.key,
            track: types.VolumeTrack.toEncodable(fields.track),
        };
    }
    toJSON() {
        return {
            key: this.key.toString(),
            track: this.track.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new FakeVolumeTrack({
            key: new PublicKey(obj.key),
            track: types.VolumeTrack.fromJSON(obj.track),
        });
    }
    toEncodable() {
        return FakeVolumeTrack.toEncodable(this);
    }
}
