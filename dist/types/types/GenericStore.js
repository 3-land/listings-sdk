import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class GenericStore {
    constructor(fields) {
        this.storeType = fields.storeType;
        this.data = fields.data;
    }
    static layout(property) {
        return borsh.struct([borsh.u16("storeType"), types.GenericValue.layout("data")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new GenericStore({
            storeType: obj.storeType,
            data: types.GenericValue.fromDecoded(obj.data),
        });
    }
    static toEncodable(fields) {
        return {
            storeType: fields.storeType,
            data: fields.data.toEncodable(),
        };
    }
    toJSON() {
        return {
            storeType: this.storeType,
            data: this.data.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new GenericStore({
            storeType: obj.storeType,
            data: types.GenericValue.fromJSON(obj.data),
        });
    }
    toEncodable() {
        return GenericStore.toEncodable(this);
    }
}
