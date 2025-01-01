import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class DateTraitInitMap {
    constructor(fields) {
        this.hash = fields.hash;
        this.date = fields.date;
        this.index = fields.index;
    }
    static layout(property) {
        return borsh.struct([borsh.u64("hash"), borsh.u32("date"), borsh.u32("index")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new DateTraitInitMap({
            hash: obj.hash,
            date: obj.date,
            index: obj.index,
        });
    }
    static toEncodable(fields) {
        return {
            hash: fields.hash,
            date: fields.date,
            index: fields.index,
        };
    }
    toJSON() {
        return {
            hash: this.hash.toString(),
            date: this.date,
            index: this.index,
        };
    }
    static fromJSON(obj) {
        return new DateTraitInitMap({
            hash: new BN(obj.hash),
            date: obj.date,
            index: obj.index,
        });
    }
    toEncodable() {
        return DateTraitInitMap.toEncodable(this);
    }
}
