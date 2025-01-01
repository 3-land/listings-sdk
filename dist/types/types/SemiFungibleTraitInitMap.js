import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class SemiFungibleTraitInitMap {
    constructor(fields) {
        this.hash = fields.hash;
        this.amount = fields.amount;
        this.index = fields.index;
    }
    static layout(property) {
        return borsh.struct([borsh.u64("hash"), borsh.u64("amount"), borsh.u32("index")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SemiFungibleTraitInitMap({
            hash: obj.hash,
            amount: obj.amount,
            index: obj.index,
        });
    }
    static toEncodable(fields) {
        return {
            hash: fields.hash,
            amount: fields.amount,
            index: fields.index,
        };
    }
    toJSON() {
        return {
            hash: this.hash.toString(),
            amount: this.amount.toString(),
            index: this.index,
        };
    }
    static fromJSON(obj) {
        return new SemiFungibleTraitInitMap({
            hash: new BN(obj.hash),
            amount: new BN(obj.amount),
            index: obj.index,
        });
    }
    toEncodable() {
        return SemiFungibleTraitInitMap.toEncodable(this);
    }
}
