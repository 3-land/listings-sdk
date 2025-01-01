import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class BurnTrack {
    constructor(fields) {
        this.amount = fields.amount;
        this.burnType = fields.burnType;
    }
    static layout(property) {
        return borsh.struct([borsh.u16("amount"), types.BurnTypeBurn.layout("burnType")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new BurnTrack({
            amount: obj.amount,
            burnType: types.BurnTypeBurn.fromDecoded(obj.burnType),
        });
    }
    static toEncodable(fields) {
        return {
            amount: fields.amount,
            burnType: fields.burnType.toEncodable(),
        };
    }
    toJSON() {
        return {
            amount: this.amount,
            burnType: this.burnType.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new BurnTrack({
            amount: obj.amount,
            burnType: types.BurnTypeBurn.fromJSON(obj.burnType),
        });
    }
    toEncodable() {
        return BurnTrack.toEncodable(this);
    }
}
