import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class VerifyCollectionMetadata {
    constructor(fields) {
        this.name = fields.name;
        this.symbol = fields.symbol;
        this.uri = fields.uri;
        this.royalty = fields.royalty;
        this.collection = fields.collection;
        this.creators = fields.creators.map((item) => new types.Creator(Object.assign({}, item)));
    }
    static layout(property) {
        return borsh.struct([
            borsh.str("name"),
            borsh.str("symbol"),
            borsh.str("uri"),
            borsh.u16("royalty"),
            borsh.u8("collection"),
            borsh.vec(types.Creator.layout(), "creators"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VerifyCollectionMetadata({
            name: obj.name,
            symbol: obj.symbol,
            uri: obj.uri,
            royalty: obj.royalty,
            collection: obj.collection,
            creators: obj.creators.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.Creator.fromDecoded(item)),
        });
    }
    static toEncodable(fields) {
        return {
            name: fields.name,
            symbol: fields.symbol,
            uri: fields.uri,
            royalty: fields.royalty,
            collection: fields.collection,
            creators: fields.creators.map((item) => types.Creator.toEncodable(item)),
        };
    }
    toJSON() {
        return {
            name: this.name,
            symbol: this.symbol,
            uri: this.uri,
            royalty: this.royalty,
            collection: this.collection,
            creators: this.creators.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new VerifyCollectionMetadata({
            name: obj.name,
            symbol: obj.symbol,
            uri: obj.uri,
            royalty: obj.royalty,
            collection: obj.collection,
            creators: obj.creators.map((item) => types.Creator.fromJSON(item)),
        });
    }
    toEncodable() {
        return VerifyCollectionMetadata.toEncodable(this);
    }
}
