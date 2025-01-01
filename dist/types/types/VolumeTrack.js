import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class VolumeTrack {
    constructor(fields) {
        this.amount = fields.amount;
        this.pieces = fields.pieces;
    }
    static layout(property) {
        return borsh.struct([borsh.u64("amount"), borsh.u64("pieces")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VolumeTrack({
            amount: obj.amount,
            pieces: obj.pieces,
        });
    }
    static toEncodable(fields) {
        return {
            amount: fields.amount,
            pieces: fields.pieces,
        };
    }
    toJSON() {
        return {
            amount: this.amount.toString(),
            pieces: this.pieces.toString(),
        };
    }
    static fromJSON(obj) {
        return new VolumeTrack({
            amount: new BN(obj.amount),
            pieces: new BN(obj.pieces),
        });
    }
    toEncodable() {
        return VolumeTrack.toEncodable(this);
    }
}
