import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class SemiFungibleTraitInit {
    constructor(fields) {
        this.hash = fields.hash;
        this.amount = fields.amount;
    }
    static layout(property) {
        return borsh.struct([borsh.u64("hash"), borsh.u64("amount")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SemiFungibleTraitInit({
            hash: obj.hash,
            amount: obj.amount,
        });
    }
    static toEncodable(fields) {
        return {
            hash: fields.hash,
            amount: fields.amount,
        };
    }
    toJSON() {
        return {
            hash: this.hash.toString(),
            amount: this.amount.toString(),
        };
    }
    static fromJSON(obj) {
        return new SemiFungibleTraitInit({
            hash: new BN(obj.hash),
            amount: new BN(obj.amount),
        });
    }
    toEncodable() {
        return SemiFungibleTraitInit.toEncodable(this);
    }
}
