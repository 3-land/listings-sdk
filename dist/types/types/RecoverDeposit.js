import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class RecoverDeposit {
    constructor(fields) {
        this.cnft = (fields.cnft && new types.CnftData(Object.assign({}, fields.cnft))) || null;
    }
    static layout(property) {
        return borsh.struct([borsh.option(types.CnftData.layout(), "cnft")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RecoverDeposit({
            cnft: (obj.cnft && types.CnftData.fromDecoded(obj.cnft)) || null,
        });
    }
    static toEncodable(fields) {
        return {
            cnft: (fields.cnft && types.CnftData.toEncodable(fields.cnft)) || null,
        };
    }
    toJSON() {
        return {
            cnft: (this.cnft && this.cnft.toJSON()) || null,
        };
    }
    static fromJSON(obj) {
        return new RecoverDeposit({
            cnft: (obj.cnft && types.CnftData.fromJSON(obj.cnft)) || null,
        });
    }
    toEncodable() {
        return RecoverDeposit.toEncodable(this);
    }
}
