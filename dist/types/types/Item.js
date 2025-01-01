import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class Item {
    constructor(fields) {
        this.metadata = new types.MetadataArgs(Object.assign({}, fields.metadata));
    }
    static layout(property) {
        return borsh.struct([types.MetadataArgs.layout("metadata")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Item({
            metadata: types.MetadataArgs.fromDecoded(obj.metadata),
        });
    }
    static toEncodable(fields) {
        return {
            metadata: types.MetadataArgs.toEncodable(fields.metadata),
        };
    }
    toJSON() {
        return {
            metadata: this.metadata.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new Item({
            metadata: types.MetadataArgs.fromJSON(obj.metadata),
        });
    }
    toEncodable() {
        return Item.toEncodable(this);
    }
}
