import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class BurnCount {
    constructor(fields) {
        this.list = fields.list.map((item) => new types.FakeBurnCount(Object.assign({}, item)));
    }
    static layout(property) {
        return borsh.struct([borsh.vec(types.FakeBurnCount.layout(), "list")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new BurnCount({
            list: obj.list.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.FakeBurnCount.fromDecoded(item)),
        });
    }
    static toEncodable(fields) {
        return {
            list: fields.list.map((item) => types.FakeBurnCount.toEncodable(item)),
        };
    }
    toJSON() {
        return {
            list: this.list.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new BurnCount({
            list: obj.list.map((item) => types.FakeBurnCount.fromJSON(item)),
        });
    }
    toEncodable() {
        return BurnCount.toEncodable(this);
    }
}
