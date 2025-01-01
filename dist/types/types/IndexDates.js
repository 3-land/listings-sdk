import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class IndexDates {
    constructor(fields) {
        this.created = new types.IndexDate(Object.assign({}, fields.created));
        this.activity = new types.IndexDate(Object.assign({}, fields.activity));
    }
    static layout(property) {
        return borsh.struct([types.IndexDate.layout("created"), types.IndexDate.layout("activity")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new IndexDates({
            created: types.IndexDate.fromDecoded(obj.created),
            activity: types.IndexDate.fromDecoded(obj.activity),
        });
    }
    static toEncodable(fields) {
        return {
            created: types.IndexDate.toEncodable(fields.created),
            activity: types.IndexDate.toEncodable(fields.activity),
        };
    }
    toJSON() {
        return {
            created: this.created.toJSON(),
            activity: this.activity.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new IndexDates({
            created: types.IndexDate.fromJSON(obj.created),
            activity: types.IndexDate.fromJSON(obj.activity),
        });
    }
    toEncodable() {
        return IndexDates.toEncodable(this);
    }
}
