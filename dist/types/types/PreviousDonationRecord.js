import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class PreviousDonationRecord {
    constructor(fields) {
        this.cnft = new types.CnftData(Object.assign({}, fields.cnft));
        this.amount = fields.amount;
        this.message = fields.message;
    }
    static layout(property) {
        return borsh.struct([
            types.CnftData.layout("cnft"),
            borsh.u64("amount"),
            borsh.str("message"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new PreviousDonationRecord({
            cnft: types.CnftData.fromDecoded(obj.cnft),
            amount: obj.amount,
            message: obj.message,
        });
    }
    static toEncodable(fields) {
        return {
            cnft: types.CnftData.toEncodable(fields.cnft),
            amount: fields.amount,
            message: fields.message,
        };
    }
    toJSON() {
        return {
            cnft: this.cnft.toJSON(),
            amount: this.amount.toString(),
            message: this.message,
        };
    }
    static fromJSON(obj) {
        return new PreviousDonationRecord({
            cnft: types.CnftData.fromJSON(obj.cnft),
            amount: new BN(obj.amount),
            message: obj.message,
        });
    }
    toEncodable() {
        return PreviousDonationRecord.toEncodable(this);
    }
}
