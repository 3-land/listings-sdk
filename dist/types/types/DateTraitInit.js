import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class DateTraitInit {
    constructor(fields) {
        this.hash = fields.hash;
        this.date = fields.date;
    }
    static layout(property) {
        return borsh.struct([borsh.u64("hash"), borsh.u32("date")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new DateTraitInit({
            hash: obj.hash,
            date: obj.date,
        });
    }
    static toEncodable(fields) {
        return {
            hash: fields.hash,
            date: fields.date,
        };
    }
    toJSON() {
        return {
            hash: this.hash.toString(),
            date: this.date,
        };
    }
    static fromJSON(obj) {
        return new DateTraitInit({
            hash: new BN(obj.hash),
            date: obj.date,
        });
    }
    toEncodable() {
        return DateTraitInit.toEncodable(this);
    }
}
