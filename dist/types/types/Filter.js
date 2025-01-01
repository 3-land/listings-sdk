import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class Filter {
    constructor(fields) {
        this.filter1 = fields.filter1;
        this.filter2 = fields.filter2;
    }
    static layout(property) {
        return borsh.struct([types.FilterType.layout("filter1"), types.FilterType.layout("filter2")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Filter({
            filter1: types.FilterType.fromDecoded(obj.filter1),
            filter2: types.FilterType.fromDecoded(obj.filter2),
        });
    }
    static toEncodable(fields) {
        return {
            filter1: fields.filter1.toEncodable(),
            filter2: fields.filter2.toEncodable(),
        };
    }
    toJSON() {
        return {
            filter1: this.filter1.toJSON(),
            filter2: this.filter2.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new Filter({
            filter1: types.FilterType.fromJSON(obj.filter1),
            filter2: types.FilterType.fromJSON(obj.filter2),
        });
    }
    toEncodable() {
        return Filter.toEncodable(this);
    }
}
