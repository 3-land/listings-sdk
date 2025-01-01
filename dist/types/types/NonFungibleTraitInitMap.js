import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class NonFungibleTraitInitMap {
    constructor(fields) {
        this.hash = fields.hash;
        this.values = fields.values.map((item) => new types.FakeTraitValue(Object.assign({}, item)));
        this.index = fields.index;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("hash"),
            borsh.vec(types.FakeTraitValue.layout(), "values"),
            borsh.u32("index"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new NonFungibleTraitInitMap({
            hash: obj.hash,
            values: obj.values.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.FakeTraitValue.fromDecoded(item)),
            index: obj.index,
        });
    }
    static toEncodable(fields) {
        return {
            hash: fields.hash,
            values: fields.values.map((item) => types.FakeTraitValue.toEncodable(item)),
            index: fields.index,
        };
    }
    toJSON() {
        return {
            hash: this.hash.toString(),
            values: this.values.map((item) => item.toJSON()),
            index: this.index,
        };
    }
    static fromJSON(obj) {
        return new NonFungibleTraitInitMap({
            hash: new BN(obj.hash),
            values: obj.values.map((item) => types.FakeTraitValue.fromJSON(item)),
            index: obj.index,
        });
    }
    toEncodable() {
        return NonFungibleTraitInitMap.toEncodable(this);
    }
}
