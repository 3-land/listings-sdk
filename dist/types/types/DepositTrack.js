import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class DepositTrack {
    constructor(fields) {
        this.depositTrackType = fields.depositTrackType;
        this.depositState = fields.depositState;
    }
    static layout(property) {
        return borsh.struct([
            types.DepositTrackType.layout("depositTrackType"),
            types.DepositState.layout("depositState"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new DepositTrack({
            depositTrackType: types.DepositTrackType.fromDecoded(obj.depositTrackType),
            depositState: types.DepositState.fromDecoded(obj.depositState),
        });
    }
    static toEncodable(fields) {
        return {
            depositTrackType: fields.depositTrackType.toEncodable(),
            depositState: fields.depositState.toEncodable(),
        };
    }
    toJSON() {
        return {
            depositTrackType: this.depositTrackType.toJSON(),
            depositState: this.depositState.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new DepositTrack({
            depositTrackType: types.DepositTrackType.fromJSON(obj.depositTrackType),
            depositState: types.DepositState.fromJSON(obj.depositState),
        });
    }
    toEncodable() {
        return DepositTrack.toEncodable(this);
    }
}
