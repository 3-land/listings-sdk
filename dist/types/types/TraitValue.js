import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class TraitValue {
    constructor(fields) {
        this.hash = fields.hash;
        this.count = fields.count;
        this.supply = fields.supply;
    }
    static layout(property) {
        return borsh.struct([borsh.u64("hash"), borsh.u32("count"), borsh.u64("supply")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new TraitValue({
            hash: obj.hash,
            count: obj.count,
            supply: obj.supply,
        });
    }
    static toEncodable(fields) {
        return {
            hash: fields.hash,
            count: fields.count,
            supply: fields.supply,
        };
    }
    toJSON() {
        return {
            hash: this.hash.toString(),
            count: this.count,
            supply: this.supply.toString(),
        };
    }
    static fromJSON(obj) {
        return new TraitValue({
            hash: new BN(obj.hash),
            count: obj.count,
            supply: new BN(obj.supply),
        });
    }
    toEncodable() {
        return TraitValue.toEncodable(this);
    }
}
