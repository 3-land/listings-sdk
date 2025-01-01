import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class NonFungibleTraitInit {
    constructor(fields) {
        this.hash = fields.hash;
        this.values = fields.values;
    }
    static layout(property) {
        return borsh.struct([borsh.u64("hash"), borsh.vec(borsh.u64(), "values")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new NonFungibleTraitInit({
            hash: obj.hash,
            values: obj.values,
        });
    }
    static toEncodable(fields) {
        return {
            hash: fields.hash,
            values: fields.values,
        };
    }
    toJSON() {
        return {
            hash: this.hash.toString(),
            values: this.values.map((item) => item.toString()),
        };
    }
    static fromJSON(obj) {
        return new NonFungibleTraitInit({
            hash: new BN(obj.hash),
            values: obj.values.map((item) => new BN(item)),
        });
    }
    toEncodable() {
        return NonFungibleTraitInit.toEncodable(this);
    }
}
